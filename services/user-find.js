import UserRepository from "../repositories/user.js";

export default class UserFindService {
    static async find(name, email){
        const users = await UserRepository.findAll(name, email);
        if(!users){
            const error = new Error();
            error.status = 400;
            error.message = "No users finded"
            throw error;
        }       
        return users;
    }
}