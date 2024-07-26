import BookRepository from "../repositories/book-repository.js";

export default class BookUpdateService {
    static async update(id, data){
        const updated = await BookRepository.update(id, data);
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the book data";
            throw error;
        }       
        return updated;
    }
}