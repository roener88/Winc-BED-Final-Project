import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import loginRouter from "./routes/login.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/review.js";
import userRouter from "./routes/users.js";

import errorHandler from "./middleware/errorHandler.js";
import log from "./middleware/logMiddleware.js";

const app = express();

Sentry.init({
  dsn: 'https://06a1ff1323c2c00c7e40a7fc8a9adc24@o4506020162830336.ingest.sentry.io/4506144845201408',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Resource routes
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", userRouter);

// Login
app.use("/login", loginRouter);

//Error Handling
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
