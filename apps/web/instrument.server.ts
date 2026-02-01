import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor, TraceIdRatioBasedSampler } from "@opentelemetry/sdk-trace-base";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import * as Sentry from "@sentry/tanstackstart-react";

import { webEnv } from "@starter/env/web";

// =============================================================================
// OpenTelemetry SDK Setup (SSR)
// https://axiom.co/docs/guides/opentelemetry-nodejs
// =============================================================================

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: webEnv.OTEL_SERVICE_NAME,
  [ATTR_SERVICE_VERSION]: webEnv.OTEL_SERVICE_VERSION,
  "deployment.environment": webEnv.NODE_ENV,
});

const traceExporter = new OTLPTraceExporter({
  url: `${webEnv.AXIOM_ENDPOINT}/v1/traces`,
  headers: {
    Authorization: `Bearer ${webEnv.AXIOM_TOKEN}`,
    "X-Axiom-Dataset": webEnv.AXIOM_DATASET,
  },
});

const sdk = new NodeSDK({
  resource,
  spanProcessor: new BatchSpanProcessor(traceExporter),
  // HTTP instrumentation captures incoming SSR requests and outgoing fetch calls
  instrumentations: [new HttpInstrumentation()],
  // Sampling: 100% in dev, 10% in production (adjust as needed)
  sampler: new TraceIdRatioBasedSampler(webEnv.NODE_ENV === "production" ? 0.1 : 1.0),
});

sdk.start();
console.log(`[OTEL] OpenTelemetry initialized for ${webEnv.OTEL_SERVICE_NAME}`);
console.log(`[OTEL] Exporting traces to Axiom dataset: ${webEnv.AXIOM_DATASET}`);

// =============================================================================
// Graceful Shutdown
// =============================================================================

async function shutdown(): Promise<void> {
  console.log("[SHUTDOWN] Web SSR shutdown initiated...");
  try {
    await sdk.shutdown();
    console.log("[SHUTDOWN] OpenTelemetry shutdown complete");
    await Sentry.close(2000);
    console.log("[SHUTDOWN] Sentry shutdown complete");
  } catch (error) {
    console.log("[SHUTDOWN] Error during shutdown:", error);
  }
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// =============================================================================
// Sentry Initialization
// =============================================================================

Sentry.init({
  dsn: webEnv.VITE_SENTRY_DSN,
  environment: webEnv.NODE_ENV,
  release: webEnv.OTEL_SERVICE_VERSION,
  sendDefaultPii: true,
  // Trace sampling (match OTEL sampling)
  tracesSampleRate: webEnv.NODE_ENV === "production" ? 0.1 : 1.0,
});

console.log(`[SENTRY] Sentry initialized for ${webEnv.NODE_ENV}`);
