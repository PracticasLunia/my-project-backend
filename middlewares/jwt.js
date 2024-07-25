import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function verifyJWT(req, res, next) {
    let token = req.headers['authorization'] || "";
    token = token.split(' ')[1];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).json({ auth: false, message: 'Token expired' });
        }

        req.user = decoded;
        next();
    });
}