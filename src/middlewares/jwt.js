import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserRepository from '../repositories/user-repository.js';

export default async function verifyJWT(req, res, next) {
    let token = req.headers['authorization'] || "";
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = (await UserRepository.get(decoded.id)).dataValues;
        next();
    } catch (err) {
        return res.status(401).json({ auth: false, message: 'Token expired' });
    }
}