import express from "express";
import authMiddleware from "../middleware/auth.js";

import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { location, pricePerNight, amenities } = req.query;

        const decodedLocation = location ? decodeURIComponent(location) : undefined;

        const properties = await getProperties( decodedLocation, pricePerNight, amenities );
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

router.post('/', authMiddleware, async( req, res ) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities } = req.body;
        const newProperty = await createProperty( title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities );
        res.status(201).json( newProperty );
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new property");
    }
});

router.put('/:id', authMiddleware, async ( req, res ) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities } = req.body;
        const updatedProperty = await updatePropertyById( id, title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating, amenities );
        
        if( updatedProperty === -1 ) {
            res.status(404).json( `Property with id ${id} was not found` );
        } else {
            res.status(200).json( updatedProperty );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while updating property by id');
    }
});

router.delete('/:id', authMiddleware, async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedPropertyId = await deletePropertyById( id );
        
        if( deletedPropertyId === -1 ) {
            res.status(404).json( `Property with id ${id} was not found and thereby not deleted` );
        } else {
            res.status(200).json({
                message: `Property with id ${deletedPropertyId} was deleted!`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting property by id');
    }
});

export default router;