import BookTag from "../models/mysql/book-tag.js";

export default class BookTagRepository {
    static async create(bookTag) {
        try {
            return (await BookTag.create(bookTag));
        } catch (err) {
            throw new Error("Some field is wrong or bookTag already exists")
        }
    }

    static async delete(bookIsbn, tagId) {
        try {
            return await BookTag.destroy({ where: { BookIsbn: bookIsbn, TagId: tagId } })
        } catch (err) {
            throw new Error("Error while deleting bookTag")
        }
    }
}