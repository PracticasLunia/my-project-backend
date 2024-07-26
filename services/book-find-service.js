import BookRepository from "../repositories/book-repository.js";

export default class BookFindService {
    static async find(title, author){
        const books = await BookRepository.findAll(title, author);
        if(!books){
            const error = new Error();
            error.status = 400;
            error.message = "No books finded"
            throw error;
        }       
        return books;
    }
}