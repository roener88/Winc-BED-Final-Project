import { Router } from 'express';
import getUsers from '../services/users/getUsers.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const router = Router();

router.post('/', async (req, res) => {

    const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';
    const { username, password } = req.body;
    const users = await getUsers(  );
    
    const user = users.find(
        (u) => u.username === username && u.password === password,
    );

    if( !user ) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({ userId: user.id }, secretKey );
    res.status(200).json({message: 'Succesfully logged in', token });

});

export default router;