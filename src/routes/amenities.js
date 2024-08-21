import express from "express";

import getAmenities from "../services/amenities/getAmenities.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the list of amenities");
  }
});

export default router;