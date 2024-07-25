import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserLoginService from '../../services/user-login-service.js';

export default class UserLoginController {
    static async login(req, res){
        try{
            const { email, password } = req.body;
            const response = await UserLoginService.login(email, password);
            const token = jwt.sign({ id: response.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: false, path: '/', maxAge: 3 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}