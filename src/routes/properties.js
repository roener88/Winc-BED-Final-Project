import express from "express";

import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const properties = await getProperties();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting the list of properties");
    }
});

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById( id );

        if(!property) {
        res.status(404).send(`Property with id ${id} was not found`);
        } else {
        res.status(200).json(property);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting property by id");
    }
});

router.post('/', async( req, res ) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating } = req.body;
        const newProperty = await createProperty( title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating );
        res.status(201).json( newProperty );
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new property");
    }
});

export default router;