import { Router } from "express";

import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js"
import updateHostById from "../services/hosts/updateHostById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, async (req, res, next) => {
    try {

        if (
            Object.hasOwn(req.body, 'username') &&
            Object.hasOwn(req.body, 'password') &&
            Object.hasOwn(req.body, 'name') &&
            Object.hasOwn(req.body, 'email') &&
            Object.hasOwn(req.body, 'phoneNumber') &&
            Object.hasOwn(req.body, 'profilePicture') &&
            Object.hasOwn(req.body, 'aboutMe')

        ) {
            const {
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
                aboutMe,
            } = req.body;
            const newHost = await createHost(
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
                aboutMe,
            );

            res.status(201).json(newHost);
        }

        else {

            res.status(400).json({
                message: `Bad Request`,
            });
        }

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await deleteHostById(id);

        if (host) {
            res.status(200).send({
                message: `Host with id ${id} successfully deleted`,
                host,
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
        const { name } = req.query;
        const hosts = await getHosts(name);
        res.json(hosts);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);

        if (!host) {
            res.status(404).json({ message: `Host with id ${id} not found` });
        } else {
            res.status(200).json(host);
        }
    } catch (error) {
        next(error);
    }
});



router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe,
        } = req.body;
        const host = await updateHostById(id, {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe,
        });

        if (host) {
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