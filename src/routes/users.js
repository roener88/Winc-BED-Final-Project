import express from 'express';

import getUsers from '../services/users/getUsers.js';
import getUserById from '../services/users/getUserById.js';
import createUser from '../services/users/createUser.js';
import updateUserById from '../services/users/updateUserById.js';
import deleteUserById from '../services/users/deleteUserById.js';

const router = express.Router();

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
        res.status(404).send(`Book with id ${id} was not found`);
        } else {
        res.status(200).json(user);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting user by id");
    }
});

router.post('/', async( req, res ) => {
    try {
        console.log(req.body);
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser( username, password, name, email, phoneNumber, profilePicture );
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new user");
    }
});

router.put('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const updatedUser = await updateUserById( id, username, password, name, email, phoneNumber, profilePicture );
        res.status(200).json( updatedUser );
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while updating user by id');
    }
});

router.delete('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedUserId = await deleteUserById( id );

        res.status(200).json({
            message: `User with id ${deletedUserId} was deleted!`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting user by id');
    }
});

export default router;