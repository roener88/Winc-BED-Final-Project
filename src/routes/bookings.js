import { Router } from "express";

import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js"
import updateBookingById from "../services/bookings/updateBookingById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const {
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus } = req.body;
        const newBooking = await createBooking(
            userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus
        );

        res.status(201).json(newBooking);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const Booking = await deleteBookingById(id);

        if (Booking) {
            res.status(200).send({
                message: `Booking with id ${id} successfully deleted`,
                Booking,
            });
        } else {
            res.status(404).json({
                message: `Booking with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const bookings = await getBookings();
        res.json(bookings);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const Booking = await getBookingById(id);

        if (!category) {
            res.status(404).json({ message: `Booking with id ${id} not found` });
        } else {
            res.status(200).json(Booking);
        }
    } catch (error) {
        next(error);
    }
});



router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const Booking = await updateBookingById(id, { name });

        if (Booking) {
            res.status(200).send({
                message: `Booking with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Booking with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;