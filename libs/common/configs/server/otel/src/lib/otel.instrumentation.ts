import opentelemetry from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { envDetector, hostDetector, osDetector, processDetector, Resource } from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
    SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
    SEMRESATTRS_K8S_POD_NAME,
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

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

    const metricResource = new Resource({
        [SEMRESATTRS_SERVICE_NAME]: serviceName,
        [SEMRESATTRS_SERVICE_VERSION]: '1.0.0',
        [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: 'prd',
        [SEMRESATTRS_K8S_POD_NAME]: 'localhost',
    });

    const metricProvider = new MeterProvider({
        resource: metricResource,
        readers: [prometheusExporter],
    });

    opentelemetry.metrics.setGlobalMeterProvider(metricProvider);

    const sdk = new NodeSDK({
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: serviceName,
        }),
        traceExporter,
        resourceDetectors: [envDetector, osDetector, hostDetector, processDetector],
        instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation(), new HttpInstrumentation()],
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
