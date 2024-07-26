import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookDeleteService from './book-delete-service.js';
import BookRepository from '../../repositories/book-repository.js';

describe('Tests for Book Delete Controller', () => {
    beforeAll(() => {
        BookRepository.delete = jest.fn(BookRepository.delete);
    });

    beforeEach(() => {
        BookRepository.delete.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.delete.mockImplementation(() => {
            return [];
        });

        await BookDeleteService.delete(1);
        expect(BookRepository.delete).toBeCalled();
    });

    test('Should return the book that te Repository returns', async () => {
        BookRepository.delete.mockImplementation(() => {
            return {};
        });

        const books = await BookDeleteService.delete(1);
        expect(books).toStrictEqual({});
    });

    test('Should throw error if Book Repository not returns the book', async () => {
        BookRepository.delete.mockImplementation(() => {
            return null;
        });
        
        try {
            await BookDeleteService.delete(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No book finded");
        }
    });
});