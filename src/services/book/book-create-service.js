import BookRepository from "../../repositories/book-repository.js";
import TagRepository from "../../repositories/tag-repository.js";

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
        for(const tagId of tags){
            const tag = await TagRepository.get(tagId);
            await created.addTag(tag);
        }
        return created;
    }
}