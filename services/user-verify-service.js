import UserRepository from "../repositories/user-repository.js";

export default class UserVerifyService {
    static async verify(id){
        const updated = await UserRepository.update(id, { verified: true });
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't verify the user";
            throw error;
        }       
        return updated;
    }
}