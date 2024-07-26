import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookUpdateService from './book-update-service.js';
import BookRepository from '../../repositories/book-repository.js';

describe('Tests for Book Update Controller', () => {
    beforeAll(() => {
        BookRepository.get = jest.fn(BookRepository.get);
        BookRepository.update = jest.fn(BookRepository.update);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        BookRepository.update.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.update.mockImplementation(() => {
            return [];
        });

        await BookUpdateService.update(1, { title: "test"} );
        expect(BookRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 book has been modified', async () => {
        BookRepository.update.mockImplementation(() => {
            return 1;
        });

        const books = await BookUpdateService.update(1, {title: "data"} );
        expect(books).toStrictEqual(1);
    });

    test('Should throw error if Book Repository not returns 1 meaning the book has not been modified', async () => {
        BookRepository.update.mockImplementation(() => {
            return 0;
        });

        try {
            await BookUpdateService.update(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the book data");
        }
    });
});