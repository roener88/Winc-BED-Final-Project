import express from "express";

import getProperties from "../services/properties/getProperties.js";

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

export default router;