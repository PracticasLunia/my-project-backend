import BookTag from "../../models/mysql/book-tag.js";
import BookRepository from "../../repositories/book-repository.js";
import BookTagRepository from "../../repositories/book-tag-repository.js";
import TagRepository from "../../repositories/tag-repository.js";

export default class BookUpdateService {
    static async update(isbn, data){
        const tags = data['Tags'];
        delete data['Tags'];
        const updated = await BookRepository.update(isbn, data);
        if(!updated){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the book data";
            throw error;
        }
        if (data.isbn !== isbn){
            isbn = data.isbn
        }
        const book = await BookRepository.get(isbn);
        const actualTags = book.dataValues.Tags;
        for (const tag of tags){
            let included = false;
            for(const actTag of actualTags){
                if(actTag.dataValues.id === tag.id)
                    included = true;
            }
            if (!included){
                await BookTagRepository.create({ BookIsbn: book.dataValues.isbn, TagId: tag.id})
            }
        }
        for (const actTag of actualTags){
            let included = false;
            for(const tag of tags){
                if(actTag.dataValues.id === tag.id)
                    included = true;
            }
            if (!included){
                await BookTagRepository.delete(isbn, actTag.dataValues.id)
            }
        }
        return updated;
    }
}