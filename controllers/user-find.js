import UserFindService from '../services/user-find.js';

export default class UserFindController {
    static async find(req, res){
        try{
            const { name, email } = req.body;
            const response = await UserFindService.find(name, email);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status | 400).json({ error: err.message })
        }
    }
}