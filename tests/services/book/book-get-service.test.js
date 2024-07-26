import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookGetService from '../../../src/services/book/book-get-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';

describe('Tests for Book Get Controller', () => {
    beforeAll(() => {
        BookRepository.get = jest.fn(BookRepository.get);
    });

    beforeEach(() => {
        BookRepository.get.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.get.mockImplementation(() => {
            return [];
        });

        await BookGetService.get(1);
        expect(BookRepository.get).toBeCalled();
    });

    test('Should return the book that te Repository returns', async () => {
        BookRepository.get.mockImplementation(() => {
            return {};
        });

        const books = await BookGetService.get(1);
        expect(books).toStrictEqual({});
    });

    test('Should throw error if Book Repository not returns the book', async () => {
        BookRepository.get.mockImplementation(() => {
            return null;
        });
        
        try {
            await BookGetService.get(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No book finded");
        }
    });
});