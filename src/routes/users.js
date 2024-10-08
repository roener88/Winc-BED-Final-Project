import express from 'express';
import { PrismaClient } from "@prisma/client";
import authMiddleware from '../middleware/auth.js';

import getUsers from '../services/users/getUsers.js';
import getUserById from '../services/users/getUserById.js';
import createUser from '../services/users/createUser.js';
import updateUserById from '../services/users/updateUserById.js';
import deleteUserById from '../services/users/deleteUserById.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const { username, email } = req.query;
        const users = await getUsers( username, email );
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting the list of users");
    }
});

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await getUserById( id );

        if(!user) {
            res.status(404).json({message: `User with id ${id} was not found`});
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting user by id");
    }
});

router.post('/', authMiddleware, async( req, res ) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password, and email are required" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username already exists, please try a different username" });
        }

        const newUser = await createUser( username, password, name, email, phoneNumber, profilePicture );
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new user");
    }
});

router.put('/:id', authMiddleware, async ( req, res ) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const updatedUser = await updateUserById( id, username, password, name, email, phoneNumber, profilePicture );
        
        if(updatedUser === -1 ) {
            res.status(404).json({message: `User with id ${id} was not found`});
        } else {
            res.status(200).json( updatedUser );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while updating user by id');
    }
});

router.delete('/:id', authMiddleware, async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedUserId = await deleteUserById( id );

        if(deletedUserId === -1 ){
            res.status(404).json({message: `Review with id ${id} was not found and thereby not deleted`});
        } else {
            res.status(200).json({message: `User with id ${deletedUserId} was deleted!`});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting user by id');
    }
});

export default router;