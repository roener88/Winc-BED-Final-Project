import express from "express";
import getAmenities from "./services/amenities/getAmenities.js";
import getBookings from "./services/bookings/getBookings.js";
import getHosts from "./services/hosts/getHosts.js";
import getProperties from "./services/properties/getProperties.js";
import getReviews from "./services/reviews/getReviews.js";
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
    const { name } = req.query;
    const hosts = await getHosts( name );
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of hosts");
  }
});

// Property Routes
app.get('/properties', async (req, res) => {
  try {
    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of properties");
  }
});

// Review Routes
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of reviews");
  }
});

// User Routes
app.get('/users', async (req, res) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers( username, email );
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of users");
  }
});




app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
