import UserVerifyService from "../../../services/user/user-verify-service.js";
import JWTUtils from "../../../utils/jwt.js";

export class UserMailVerifyController {
    static  async verify(req, res){
        try{
            const { token } = req.params;
            const validated = await JWTUtils.validateToken(token);
            const response = await UserVerifyService.verify(validated.id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default UserMailVerifyController