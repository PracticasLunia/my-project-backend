import UserRepository from "../../repositories/user-repository.js";
import bcrypt from 'bcrypt';

export default class UserLoginService {
    static async login(email, password){
        if(!email || !password) {
            const error = new Error("User or password missing");
            error.status = 400;
            throw error;
        }
        const user = await UserRepository.getByEmail(email);
        if(!user){
            const error = new Error();
            error.status = 400;
            error.message = "User does not exists"
            throw error;
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            const error = new Error();
            error.status = 400;
            error.message = "Incorrect password";
            throw error;
        }    
        return user;
    }
}