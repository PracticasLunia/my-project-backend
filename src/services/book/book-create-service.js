import BookRepository from "../../repositories/book-repository.js";
import BookTagRepository from "../../repositories/book-tag-repository.js";

export default class BookCreateService {
    static async create(data){
        const tags = data['Tags'];
        delete data['Tags'];
        const created = await BookRepository.create(data);
        if(!created || created[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't create the book data";
            throw error;
        }
        for (const tag of tags){
            await BookTagRepository.create({ BookIsbn: created.dataValues.isbn, TagId: tag.id})
        }
        return created;
    }
}