import express from "express";

import logMiddleware from "./middleware/log.js";
import errorHandler from "./middleware/errorHandler.js";

import amenityRouter from "./routes/amenities.js";
import bookingRouter from "./routes/bookings.js";
import hostRouter from "./routes/hosts.js";
import loginRouter from './routes/login.js';
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";
import userRouter from "./routes/users.js";

const app = express();

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
