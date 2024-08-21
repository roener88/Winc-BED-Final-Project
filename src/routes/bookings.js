import express from "express";

import getBookings from "../services/bookings/getBookings.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const bookings = await getBookings( userId );
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting the list of bookings");
    }
});

export default router;