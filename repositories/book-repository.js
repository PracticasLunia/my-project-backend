import Book from "../models/mysql/book.js";
import Sequelize from 'sequelize'
const Op = Sequelize.Op


export default class BookRepository {
    static async get(isbn) {
        try {
            return await Book.findByPk(isbn, { raw: true });
        } catch (err) {
            throw new Error("Error while finding book")
        }
    }

    static async create(book) {
        try {
            return (await Book.create(book, {raw: true})).dataValues;
        } catch (err) {
            throw new Error("Some field is wrong or book with email already exists")
        }
    }

    static async update(isbn, book) {
        try {
            return await Book.update(book, { where: { isbn: isbn } });
        } catch (err) {
            throw new Error("Error while updating book")
        }
    }

    static async delete(isbn) {
        try {
            return await Book.destroy({ where: { isbn: isbn } });
        } catch (err) {
            throw new Error("Error while deleting book")
        }
    }

    static async findAll(title = '', author = ''){
        try {
            return await Book.findAll({ where: { 
                title: {[Op.like]: `%${title}%`},
                author: {[Op.like]: `%${author}%`}
            }, raw: true });
        } catch (err) {
            throw new Error("Error while finding books")
        }
    }
}