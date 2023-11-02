import { Router } from "express";

import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js"
import updateReviewById from "../services/reviews/updateReviewById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newReview = await createReview(name);

        res.status(201).json(newReview);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const Review = await deleteReviewById(id);

        if (Review) {
            res.status(200).send({
                message: `Review with id ${id} successfully deleted`,
                Review,
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const Review = await getReviewById(id);

        if (!category) {
            res.status(404).json({ message: `Review with id ${id} not found` });
        } else {
            res.status(200).json(Review);
        }
    } catch (error) {
        next(error);
    }
});



router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const Review = await updateReviewById(id, { name });

        if (Review) {
            res.status(200).send({
                message: `Review with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;