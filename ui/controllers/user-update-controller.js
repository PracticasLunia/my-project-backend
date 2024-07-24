import UserUpdateService from "../../services/user-update-service.js";

export class UserUpdateController {
    static  async update(req, res){
        try{
            const { id } = req.params;
            const response = await UserUpdateService.update(id, req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default UserUpdateController