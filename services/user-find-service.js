import BookRepository from "../repositories/user-repository.js";

export default class BookFindService {
    static async find(name, email){
        const users = await BookRepository.findAll(name, email);
        if(!users){
            const error = new Error();
            error.status = 400;
            error.message = "No users finded"
            throw error;
        }       
        return users;
    }
}