import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import Book from "../models/mysql/book.js";
import BookRepository from './book-repository';

describe('Tests for Book Find Controller', () => {
    beforeAll(() => {
        Book.findByPk = jest.fn(() => { return {}; });
        Book.create = jest.fn(() => { return {}; });
        Book.destroy = jest.fn(() => { return 1; });
        Book.update = jest.fn(() => { return {}; });
        Book.findAll = jest.fn(() => { return [{}]; });
    });

    beforeEach(() => {
        Book.findByPk.mockClear();
        Book.create.mockClear();
        Book.destroy.mockClear();
        Book.update.mockClear();
        Book.findAll.mockClear();
    });

    test('All methods should use Book Model', async () => {
        BookRepository.get(1);
        BookRepository.create({});
        BookRepository.delete(1);
        BookRepository.update(1, {});
        BookRepository.findAll();

        expect(Book.findByPk).toBeCalled();
        expect(Book.create).toBeCalled();
        expect(Book.destroy).toBeCalled();
        expect(Book.update).toBeCalled();
        expect(Book.findAll).toBeCalled();
    });

    test('All methods throw an error if Book model fails', async () => {
        Book.findByPk.mockImplementation(() => { throw new Error(""); });
        Book.create.mockImplementation(() => { throw new Error(""); });
        Book.destroy.mockImplementation(() => { throw new Error(""); });
        Book.update.mockImplementation(() => { throw new Error(""); });
        Book.findAll.mockImplementation(() => { throw new Error(""); });

        try {
            await BookRepository.get(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding book");
        }

        try {
            await BookRepository.create({});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Some field is wrong or book with email already exists");
        }

        try {
            await BookRepository.delete(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while deleting book");
        }

        try {
            await BookRepository.update(1, {});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while updating book");
        }

        try {
            await BookRepository.findAll();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding books");
        }
    });
});