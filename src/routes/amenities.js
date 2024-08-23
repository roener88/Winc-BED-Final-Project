import express from "express";

import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";

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

router.get('/:id', async ( req, res ) => {
  try {
      const { id } = req.params;
      const amenity = await getAmenityById( id );

      if(!amenity) {
        res.status(404).send(`Amenity with id ${id} was not found`);
      } else {
        res.status(200).json(amenity);
      }

  } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong while getting amenity by id");
  }
});

router.post('/', async( req, res ) => {
  try {
      const { name } = req.body;
      const newAmenity = await createAmenity( name );
      res.status(201).json( newAmenity );
  } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong while creating a new amenity");
  }
});

export default router;