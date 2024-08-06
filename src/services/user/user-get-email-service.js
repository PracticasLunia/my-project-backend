import UserRepository from "../../repositories/user-repository.js";

export default class UserGetEmailService {
    static async get(email){
        const user = await UserRepository.getByEmail(email);
        if(!user){
            const error = new Error();
            error.status = 400;
            error.message = "No user finded";
            throw error;
        }       
        return user;
    }
}