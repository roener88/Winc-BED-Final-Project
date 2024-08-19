import express from "express";
import getUsers from "./services/users/getUsers.js";

// Booking
import getBookings from "./services/bookings/getBookings.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// User Routes
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of users");
  }
});


// Booking Routes
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of bookings");
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
