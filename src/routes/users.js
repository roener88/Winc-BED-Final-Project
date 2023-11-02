import { Router } from "express";

import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js"
import updateUserById from "../services/users/updateUserById.js"

import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newUser = await createUser(name);

        res.status(201).json(newUser);

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
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!category) {
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
        const { name } = req.body;
        const User = await updateUserById(id, { name });

        if (User) {
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