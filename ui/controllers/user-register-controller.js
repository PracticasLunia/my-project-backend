import jwt from 'jsonwebtoken'
import UserRegisterService from "../../services/user-register-service.js";

export default class UserRegisterController {
    static async register(req, res){
        try{
            const data = req.body;
            const response = await UserRegisterService.register(data);
            const token = jwt.sign({ id: response.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: false, path: '/', maxAge: 3 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}