import UserVerifyService from "../../services/user-verify-service.js";

export class UserVerifyController {
    static  async verify(req, res){
        try{
            const { id } = req.params;
            const response = await UserVerifyService.verify(id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default UserVerifyController