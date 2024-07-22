import UserLoginService from '../services/user-login.js';

export default class UserLoginController {
    static async login(req, res){
        try{
            const { email, password } = req.body;
            const response = await UserLoginService.login(email, password);
            const token = jwt.sign({ id: response.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: true, path: '/', maxAge: 3 * 60 * 60 * 1000, secure: false, sameSite: 'strict' });
            res.status(200).json({ user: response, token: token });
        } catch (err){
            res.status(err.status | 400).json({ error: err.message })
        }
    }
}