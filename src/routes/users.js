import { Router } from "express";

import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js"
import updateUserById from "../services/users/updateUserById.js"

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
            Object.hasOwn(req.body, 'profilePicture')

        ) {

            const {
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
            } = req.body;

            const newUser = await createUser(
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
            );

            res.status(201).json(newUser);

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
        const user = await deleteUserById(id);

        if (user) {
            res.status(200).send({
                message: `User with id ${id} successfully deleted`,
                user,
            });
        } else {
            res.status(404).json({
                message: `User with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const { username, email } = req.query;
        const users = await getUsers(username, email);
        res.json(users);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
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
        } = req.body;
        const user = await updateUserById(id, {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
        });

        if (user) {
            res.status(200).send({
                message: `User with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `User with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;