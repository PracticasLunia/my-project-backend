import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookCreateService from '../../../src/services/book/book-create-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';
import BookTagRepository from '../../../src/repositories/book-tag-repository.js';

describe('Tests for Book Create Controller', () => {
    beforeAll(() => {
        BookRepository.create = jest.fn(BookRepository.create);
        BookTagRepository.create = jest.fn(() => { return {}; });
    });

    beforeEach(() => {
        BookRepository.create.mockClear();
        BookTagRepository.create.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.create.mockImplementation(() => {
            return [];
        });

        const books = await BookCreateService.create({title: "data", Tags: []} );
        expect(BookRepository.create).toBeCalled();
    });

    test('Should return 1 meaning 1 book has been modified', async () => {
        BookRepository.create.mockImplementation(() => {
            return 1;
        });

        const books = await BookCreateService.create({title: "data", Tags: []});
        expect(books).toStrictEqual(1);
    });

    test('Should create all new tags associations', async () => {
        BookRepository.create.mockImplementation(() => {
            return {
                dataValues: {
                    isbn: 'asdsa'
                }
            };
        });

        const books = await BookCreateService.create({title: "data", Tags: [1, 2]});
        expect(BookTagRepository.create).toBeCalledTimes(2);
    });

    test('Should throw error if Book Repository not returns 1 meaning the book has not been modified', async () => {
        BookRepository.create.mockImplementation(() => {
            return 0;
        });

        try {
            await BookCreateService.create({title: "data"});
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't create the book data");
        }
    });
});