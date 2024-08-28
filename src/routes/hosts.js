import express from "express";
import authMiddleware from "../middleware/auth.js";

import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const hosts = await getHosts( name );
        res.status(200).json(hosts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting the list of hosts");
    }
});

router.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const host = await getHostById( id );

        if(!host) {
            res.status(404).send(`Host with id ${id} was not found`);
        } else {
            res.status(200).json(host);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while getting host by id");
    }
});

router.post('/', authMiddleware, async( req, res ) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const newHost = await createHost( username, password, name, email, phoneNumber, profilePicture, aboutMe );
        res.status(201).json( newHost );
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while creating a new host");
    }
});

router.put('/:id', authMiddleware, async ( req, res ) => {
    try {

        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const updatedHost = await updateHostById( id, username, password, name, email, phoneNumber, profilePicture, aboutMe );
        
        if( updatedHost === -1 ) {
            res.status(404).send(`Host with id ${id} was not found`);
        } else {
            res.status(200).json( updatedHost );
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while updating host by id');
    }
});

router.delete('/:id', authMiddleware, async ( req, res ) => {

    try {
        const { id } = req.params;
        const deletedHostId = await deleteHostById( id );
  
        if( deletedHostId === -1 ) {
            res.status(400).json(`Host with id ${id} was not found and thereby has not been deleted`);
        }

        res.status(200).json({
            message: `Host with id ${deletedHostId} was deleted!`
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting host by id');
    }
});

export default router;