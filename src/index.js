import express from "express";
import getAmenities from "./services/amenities/getAmenities.js";
import getBookings from "./services/bookings/getBookings.js";
import getHosts from "./services/hosts/getHosts.js";
import getUsers from "./services/users/getUsers.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Amenity Routes
app.get('/amenities', async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of amenities");
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
});

// Host Routes
app.get('/hosts', async (req, res) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of hosts");
  }
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




app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
