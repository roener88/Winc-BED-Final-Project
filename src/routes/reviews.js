import express from "express";

import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting the list of reviews");
    }
});

router.post('/', async( req, res ) => {
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReview( userId, propertyId, rating, comment );
        res.status(201).json( newReview );
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new review");
    }
});

export default router;