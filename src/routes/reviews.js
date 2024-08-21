import express from "express";

import getReviews from "../services/reviews/getReviews.js";

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

export default router;