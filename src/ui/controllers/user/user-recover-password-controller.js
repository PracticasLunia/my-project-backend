import UserGetEmailService from '../../../services/user/user-get-email-service.js';
import UserSendRecoverPasswordMailService from '../../../services/user/user-send-recover-password-mail-service.js';
import JWTUtils from '../../../utils/jwt.js';

export default class UserRecoverPasswordController {
    static async recover(req, res){
        try{
            const { email } = req.body;
            const response = await UserGetEmailService.get(email);
            const { token } = JWTUtils.generateTokens(response.dataValues);
            UserSendRecoverPasswordMailService.send(token, response.dataValues);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}