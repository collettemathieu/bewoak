import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export const runOtelInstrumentation = (serviceName: string) => {
    // Exporteur de traces OTLP (peut être envoyé à Jaeger, Tempo, etc.)
    const traceExporter = new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces', // Tempo ou Jaeger
    });

    // Exporteur de métriques Prometheus
    const prometheusExporter = new PrometheusExporter(
        { port: 9464 }, // Port par défaut pour Prometheus
        () => {
            // biome-ignore lint/suspicious/noConsoleLog: <explanation>
            console.log('🎯 Prometheus metrics available at http://localhost:9464/metrics');
        }
    );

    const sdk = new NodeSDK({
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: serviceName,
        }),
        traceExporter,
        metricReader: prometheusExporter, // Ajoute les métriques Prometheus
        instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation(), new NestInstrumentation()],
    });

    // Démarrage de l’OTEL SDK
    sdk.start();

    // Gestion propre à l'arrêt de l’application
    process.on('SIGTERM', async () => {
        await sdk.shutdown();
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log('👋 OpenTelemetry shutdown');
        process.exit(0);
    });
};
