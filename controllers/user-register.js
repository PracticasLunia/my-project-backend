import UserRegisterService from "../services/user-register.js";

export default class UserRegisterController {
    static async register(req, res){
        try{
            const data = req.body;
            const response = await UserRegisterService.register(data);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status | 400).json({ error: err.message })
        }
    }
}