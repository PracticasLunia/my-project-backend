import jws from 'jsonwebtoken';
import dotenv from 'dotenv/config';

export default function verifyJWT(req, res, next) {
    const token = req.headers['Authorization'] || "";
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token' });
        }

        req.user = decoded.id;
        next();
    });
}