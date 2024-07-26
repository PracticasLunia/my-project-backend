import UserRepository from "../../repositories/user-repository.js";
import bcrypt from 'bcrypt';

export default class UserUpdateService {
    static async update(id, data){
        const user = await UserRepository.get(id);
        if(data['password'] !== user.password){
            data['password'] = await bcrypt.hash(data['password'], 12);
        }
        const updated = await UserRepository.update(id, data);
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the user data";
            throw error;
        }       
        return updated;
    }
}