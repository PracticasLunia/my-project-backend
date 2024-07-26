import UserRegisterService from "../../../services/user/user-register-service.js";
import JWTUtils from '../../../utils/jwt.js';

export default class UserRegisterController {
    static async register(req, res){
        try{
            const data = req.body;
            const response = await UserRegisterService.register(data);
            JWTUtils.generateAndSendTokens(response, res)
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}