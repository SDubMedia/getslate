// Side-effect: initialize Sentry once per cold start.
// Import at the top of any api/*.ts file:  import "./_sentry.js";

import * as Sentry from "@sentry/node";

const SENTRY_DSN = process.env.SENTRY_DSN || "";
if (SENTRY_DSN && process.env.VERCEL_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.VERCEL_ENV,
    tracesSampleRate: 0,
  });
}
