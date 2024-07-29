import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default class JWTUtils {
    static generateAndSendTokens(data, res) {
        delete data['iat'];
        delete data['exp'];
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: false, path: '/', maxAge: 2 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: false, path: '/', maxAge: 24 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
        return {token: token, refreshToken: refreshToken}
    }

    static refreshTokens(req, res) {
        let refreshToken = req.headers['authorization'];
        if (refreshToken && refreshToken.startsWith('Bearer')) {
            refreshToken = refreshToken.split(' ')[1];
        }
        if (!refreshToken) {
            let error = new Error('No refresh token provided');
            error.status = 401;
            throw error;
        }

        try {
            let decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return JWTUtils.generateAndSendTokens(decoded, res);
        } catch (err) {
            let error = new Error('Failed to authenticate refresh token');
            error.status = err.status || 401;
            throw error;
        }
    };
}