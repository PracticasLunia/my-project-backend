import BookTag from "../../models/mysql/book-tag.js";
import BookRepository from "../../repositories/book-repository.js";
import TagRepository from "../../repositories/tag-repository.js";

export default class BookUpdateService {
    static async update(isbn, data){
        const tags = data['Tags'];
        delete data['Tags'];
        const updated = await BookRepository.update(isbn, data);
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the book data";
            throw error;
        }
        const book = await BookRepository.get(isbn);
        const actualTags = (await BookRepository.get(isbn)).dataValues.Tags;

        for (const tag of tags){
            let included = false;
            for(const actTag of actualTags){
                if(actTag.dataValues.id === tag.id)
                    included = true;
            }
            if (!included){
                const createTag = await TagRepository.get(tag.id);
                await book.addTag(createTag);
            }
        }
        for (const actTag of actualTags){
            let included = false;
            for(const tag of tags){
                if(actTag.dataValues.id === tag.id)
                    included = true;
            }
            if (!included){
                await BookTag.destroy({ where: { BookIsbn: isbn, TagId: actTag.dataValues.id } })
            }
        }
        return updated;
    }
}