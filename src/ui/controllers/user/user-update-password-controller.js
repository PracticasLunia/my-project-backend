import JWTUtils from '../../../utils/jwt.js';
import UserUpdateService from '../../../services/user/user-update-service.js'

export default class UserUpdatePasswordController {
    static async update(req, res){
        try{
            const { token } = req.params;
            const validated = await JWTUtils.validateToken(token);
            const { password } = req.body
            const response = await UserUpdateService.update(validated.id, { password: password });
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}