import BookRepository from "../../repositories/book-repository.js";

export default class BookGetService {
    static async get(isbn){
        const book = await BookRepository.get(isbn);
        if(!book){
            const error = new Error();
            error.status = 400;
            error.message = "No book finded";
            throw error;
        }       
        return book;
    }
}