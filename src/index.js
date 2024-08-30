import express from "express";

import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import logMiddleware from "./middleware/log.js";
import errorHandler from "./middleware/errorHandler.js";
// import './middleware/instrument.js';

import amenityRouter from "./routes/amenities.js";
import bookingRouter from "./routes/bookings.js";
import hostRouter from "./routes/hosts.js";
import loginRouter from './routes/login.js';
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";
import userRouter from "./routes/users.js";

const app = express();

Sentry.init({
  dsn: "https://3d3b573298a9f7cefce4ce3e42c7eef8@o4507678426202112.ingest.de.sentry.io/4507866881917008",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


app.use(express.json());

// Logging middleware on all routes
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Amenity Routes
app.use('/amenities', amenityRouter);

// Booking Routes
app.use('/bookings', bookingRouter);

// Host Routes
app.use('/hosts', hostRouter);

// Login Route
app.use('/login', loginRouter);

// Property Routes
app.use('/properties', propertyRouter);

// Review Routes
app.use('/reviews', reviewRouter);

// User Routes
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
