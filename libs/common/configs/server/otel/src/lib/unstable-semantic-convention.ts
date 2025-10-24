/**
 * Following attributes are experimental and subject to breaking
 * changes in minor releases of @opentelemetry/semantic-conventions.
 *
 * Recommandation is to not import @opentelemetry/semantic-conventions/incubating in runtime code
 *
 * See: https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */
const ATTR_CONTAINER_NAME = 'container.name';
const ATTR_DEPLOYMENT_ENVIRONMENT = 'deployment.environment';
const ATTR_DEPLOYMENT_ENVIRONMENT_NAME = 'deployment.environment.name';
const ATTR_K8S_POD_NAME = 'k8s.pod.name';
const ATTR_SERVICE_NAMESPACE = 'service.namespace';
const ATTR_OTEL_COMPONENT_NAME = 'otel.component.name';

export {
    ATTR_CONTAINER_NAME,
    ATTR_DEPLOYMENT_ENVIRONMENT,
    ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
    ATTR_K8S_POD_NAME,
    ATTR_SERVICE_NAMESPACE,
    ATTR_OTEL_COMPONENT_NAME,
};
