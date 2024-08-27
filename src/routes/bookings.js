import express from "express";

import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";

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

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById( id );

        if(!booking) {
        res.status(404).send(`Booking with id ${id} was not found`);
        } else {
        res.status(200).json(booking);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting booking by id");
    }
});

router.post('/', async( req, res ) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const newBooking = await createBooking( userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus );
        res.status(201).json( newBooking );
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new booking");
    }
});

export default router;