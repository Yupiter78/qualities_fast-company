import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://c489b442dfd1477686f6c450ce822610@o1067012.ingest.sentry.io/6060292",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0
    });
}

function log(error) {
    Sentry.captureException(error);
}

const logger = {
    init,
    log
};

export default logger;
