import UserRepository from "../../repositories/user-repository.js";

export default class UserGetService {
    static async get(id){
        const user = await UserRepository.get(id);
        if(!user){
            const error = new Error();
            error.status = 400;
            error.message = "No user finded";
            throw error;
        }       
        return user;
    }
}