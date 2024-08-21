import express from "express";

import getHosts from "../services/hosts/getHosts.js";

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

export default router;