import { Router } from "express";

import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js"
import updatePropertyById from "../services/properties/updatePropertyById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newProperty = await createProperty(name);

        res.status(201).json(newProperty);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await deletePropertyById(id);

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} successfully deleted`,
                Property,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const properties = await getProperties();
        res.json(properties);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);

        if (!property) {
            res.status(404).json({ message: `Property with id ${id} not found` });
        } else {
            res.status(200).json(property);
        }
    } catch (error) {
        next(error);
    }
});



router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const property = await updatePropertyById(id, { name });

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;