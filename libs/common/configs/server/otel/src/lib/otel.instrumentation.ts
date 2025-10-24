import opentelemetry from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { envDetector, hostDetector, osDetector, processDetector, resourceFromAttributes } from '@opentelemetry/resources';
import { ConsoleLogRecordExporter, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import {
    ATTR_CONTAINER_NAME,
    ATTR_DEPLOYMENT_ENVIRONMENT,
    ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
    ATTR_K8S_POD_NAME,
    ATTR_OTEL_COMPONENT_NAME,
    ATTR_SERVICE_NAMESPACE,
} from './unstable-semantic-convention';

export const runOtelInstrumentation = (serviceName: string) => {
    // Exporteur de traces OTLP (peut être envoyé à Jaeger, Tempo, etc.)
    const traceExporter = new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces', // Tempo ou Jaeger
    });

    // Exporteur de métriques Prometheus
    const prometheusExporter = new PrometheusExporter(
        { port: 9464 }, // Port par défaut pour Prometheus
        () => {}
    );

    const metricResource = resourceFromAttributes({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: '1.0.0',
        [ATTR_CONTAINER_NAME]: serviceName,
        [ATTR_OTEL_COMPONENT_NAME]: serviceName,
        [ATTR_DEPLOYMENT_ENVIRONMENT]: 'prd',
        [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: 'prd',
        [ATTR_K8S_POD_NAME]: 'localhost',
        [ATTR_SERVICE_NAMESPACE]: serviceName,
    });

    const metricProvider = new MeterProvider({
        readers: [prometheusExporter],
        resource: metricResource,
    });

    opentelemetry.metrics.setGlobalMeterProvider(metricProvider);

    const sdk = new NodeSDK({
        instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation(), new HttpInstrumentation()],
        logRecordProcessors: [
            new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
            // Use BatchLogRecordProcessor with OTLPLogExporter for production
            new SimpleLogRecordProcessor(new OTLPLogExporter()),
        ],
        resource: metricResource,
        resourceDetectors: [envDetector, osDetector, hostDetector, processDetector],
        traceExporter,
    });

    // Démarrage de l’OTEL SDK
    sdk.start();

    // Gestion propre à l'arrêt de l’application
    process.on('SIGTERM', async () => {
        await sdk.shutdown();
        // biome-ignore lint/suspicious/noConsole: <Not applicable>
        console.log('👋 OpenTelemetry shutdown');
        process.exit(0);
    });
};
