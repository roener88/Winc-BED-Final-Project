import express from "express";
import getUsers from "./services/users/getUsers.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

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
