import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookFindService from '../../../src/services/book/book-find-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';

describe('Tests for Book Find Controller', () => {
    beforeAll(() => {
        BookRepository.findAll = jest.fn(BookRepository.findAll);
    });

    beforeEach(() => {
        BookRepository.findAll.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.findAll.mockImplementation(() => {
            return [];
        });

        await BookFindService.find('', '');
        expect(BookRepository.findAll).toBeCalled();
    });

    test('Should return a book list', async () => {
        BookRepository.findAll.mockImplementation(() => {
            return [];
        });

        const books = await BookFindService.find('', '');
        expect(books).toStrictEqual([]);
    });

    test('Should throw error if Book Repository not returns a book list', async () => {
        BookRepository.findAll.mockImplementation(() => {
            return null;
        });
        
        try {
            await BookFindService.find('', '');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No books finded");
        }
    });
});