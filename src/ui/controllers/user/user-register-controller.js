import UserGeneratePreferencesService from "../../../services/user/user-generate-preferences-service.js";
import UserRegisterService from "../../../services/user/user-register-service.js";
import UserSendVerifyMailService from "../../../services/user/user-send-verify-mail-service.js";
import JWTUtils from '../../../utils/jwt.js';

export default class UserRegisterController {
    static async register(req, res){
        try{
            const data = req.body;
            const preferences = await UserGeneratePreferencesService.generate(data.description);
            data['preferences'] = preferences;
            const response = await UserRegisterService.register(data);
            const { token } = JWTUtils.generateAndSendTokens(response.dataValues, res);
            UserSendVerifyMailService.send(token, response.dataValues);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}