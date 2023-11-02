import { Router } from "express";

import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js"
import updateHostById from "../services/hosts/updateHostById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newHost = await createHost(name);

        res.status(201).json(newHost);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const Host = await deleteHostById(id);

        if (Host) {
            res.status(200).send({
                message: `Host with id ${id} successfully deleted`,
                Host,
            });
        } else {
            res.status(404).json({
                message: `Host with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const hosts = await getHosts();
        res.json(hosts);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const Host = await getHostById(id);

        if (!category) {
            res.status(404).json({ message: `Host with id ${id} not found` });
        } else {
            res.status(200).json(Host);
        }
    } catch (error) {
        next(error);
    }
});



router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const Host = await updateHostById(id, { name });

        if (Host) {
            res.status(200).send({
                message: `Host with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Host with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;