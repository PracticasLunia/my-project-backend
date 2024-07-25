import 'dotenv/config';
import jwt from 'jsonwebtoken';

export function generateAndSendTokens(data, res) {
    delete data['iat'];
    delete data['exp'];
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: false, path: '/', maxAge: 2 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: false, path: '/', maxAge: 24 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });

    return {token: token, refreshToken: refreshToken}
}

export function refreshTokens(req, res) {
    let refreshToken = req.headers['authorization'] || "";
    refreshToken = refreshToken.split(' ')[1];
    if (!refreshToken) {
        let error = new Error({ auth: false, message: 'No refresh token provided' });
        error.status = 401;
        throw error;
    }


    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, function (err, decoded) {
        if (err) {
            let error = new Error({ auth: false, message: 'Failed to authenticate refresh token' });
            error.status = 401;
            throw error;
        }
        
        return generateAndSendTokens(decoded, res);
    });
}