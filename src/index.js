import express, { response } from "express";
import getAmenities from "./services/amenities/getAmenities.js";
import getBookings from "./services/bookings/getBookings.js";
import getHosts from "./services/hosts/getHosts.js";
import getProperties from "./services/properties/getProperties.js";
import getReviews from "./services/reviews/getReviews.js";

import getUsers from "./services/users/getUsers.js";
import getUserById from "./services/users/getUserById.js";
import createUser from "./services/users/createUser.js";

const app = express();

app.use(express.json());

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
    const { userId } = req.query;
    const bookings = await getBookings( userId );
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

app.get('/users/:id', async ( req, res ) => {
  try {
    const { id } = req.params;
    const user = await getUserById( id );

    if(!user) {
      res.status(404).send(`Book with id ${id} was not found`);
    } else {
      res.status(200).json(user);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting user by id");
  }
});

app.post('/users', async( req, res ) => {
  try {
    console.log(req.body);
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;
    const newUser = await createUser( username, password, name, email, phoneNumber, profilePicture );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new user");
  }
});


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
