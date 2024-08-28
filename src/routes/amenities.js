import express from "express";
import authMiddleware from "../middleware/auth.js";

import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";

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

router.post('/', authMiddleware, async( req, res ) => {
  try {
      const { name } = req.body;
      const newAmenity = await createAmenity( name );
      res.status(201).json( newAmenity );
  } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong while creating a new amenity");
  }
});

router.put('/:id', authMiddleware, async ( req, res ) => {
  try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById( id, name );

      if( updatedAmenity === -1 ){
        res.status(404).json(`Amenity with id ${id} was not found`);
      } else {
        res.status(200).json( updatedAmenity );
      }

  } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong while updating amenity by id');
  }
});

router.delete('/:id', authMiddleware, async ( req, res ) => {
  try {
      const { id } = req.params;
      const deletedAmenityId = await deleteAmenityById( id );

      if(deletedAmenityId === -1 ) {
        res.status(404).json(`Amenity with id ${id} was not found and thereby not deleted`);
      } else {
        res.status(200).json({
          message: `Amenity with id ${deletedAmenityId} was deleted!`
        });
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong while deleting amenity by id');
  }
});

export default router;