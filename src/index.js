import express from "express";
import "dotenv/config";

import amenitiesRouter from "./routes/amenities.js";
// import bookingsRouter from "./routes/bookings.js";
// import hostsRouter from "./routes/hosts.js";
import loginRouter from "./routes/login.js";
// import propertiesRouter from "./routes/properties.js";
// import reviewsRouter from "./routes/review.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Resource routes
app.use("/amenities", amenitiesRouter);
// app.use("/bookings", bookingsRouter);
// app.use("/hosts", hostsRouter);
// app.use("/properties", propertiesRouter);
// app.use("/reviews", reviewsRouter);

// Login
app.use("/login", loginRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
