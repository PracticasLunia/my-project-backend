import BookRepository from "../../repositories/book-repository.js";

export default class BookCreateService {
    static async create(data){
        const created = await BookRepository.create(data);
        if(!created || created[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't create the book data";
            throw error;
        }       
        return created;
    }
}