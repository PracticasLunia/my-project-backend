import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookCreateService from '../../../src/services/book/book-create-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';

describe('Tests for Book Create Controller', () => {
    beforeAll(() => {
        BookRepository.create = jest.fn(BookRepository.create);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        BookRepository.create.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.create.mockImplementation(() => {
            return [];
        });

        await BookCreateService.create(1, { title: "test"} );
        expect(BookRepository.create).toBeCalled();
    });

    test('Should return 1 meaning 1 book has been modified', async () => {
        BookRepository.create.mockImplementation(() => {
            return 1;
        });

        const books = await BookCreateService.create(1, {title: "data"} );
        expect(books).toStrictEqual(1);
    });

    test('Should throw error if Book Repository not returns 1 meaning the book has not been modified', async () => {
        BookRepository.create.mockImplementation(() => {
            return 0;
        });

        try {
            await BookCreateService.create(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't create the book data");
        }
    });
});