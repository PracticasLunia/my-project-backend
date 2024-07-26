import UserGetService from "../../../services/user/user-get-service.js";

export class UserGetController {
    static  async get(req, res){
        try{
            const { id } = req.params;
            const response = await UserGetService.get(id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default UserGetController