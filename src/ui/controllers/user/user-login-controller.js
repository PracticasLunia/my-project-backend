import UserLoginService from '../../../services/user/user-login-service.js';
import JWTUtils from '../../../utils/jwt.js';

export default class UserLoginController {
    static async login(req, res){
        try{
            const { email, password } = req.body;
            const response = await UserLoginService.login(email, password);
            JWTUtils.generateAndSendTokens(response.dataValues, res)
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}