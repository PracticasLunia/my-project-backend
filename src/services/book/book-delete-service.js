import BookRepository from "../../repositories/book-repository.js";

export default class BookDeleteService {
    static async delete(id){
        const book = await BookRepository.delete(id);
        if(!book){
            const error = new Error();
            error.status = 400;
            error.message = "No book finded";
            throw error;
        }       
        return book;
    }
}