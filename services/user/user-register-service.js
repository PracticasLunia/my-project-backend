import UserRepository from "../../repositories/user-repository.js";
import bcrypt from 'bcrypt';

export default class UserRegisterService {
    static async register(data){
        if(!data['password']) {
            const error = new Error();
            error.status = 400;
            error.message = "User data missing";
            throw error;
        }
        data['password'] = await bcrypt.hash(data['password'], 12);
        const user = await UserRepository.create(data);
        if(!user){
            const error = new Error();
            error.status = 400;
            error.message = "Can not create user";
            throw error;
        }
        return user;
    }
}