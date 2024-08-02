import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookUpdateService from '../../../src/services/book/book-update-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';
import BookTagRepository from '../../../src/repositories/book-tag-repository.js';

describe('Tests for Book Update Controller', () => {
    beforeAll(() => {
        BookRepository.get = jest.fn(BookRepository.get);
        BookRepository.update = jest.fn(BookRepository.update);
        BookTagRepository.create = jest.fn(() => { return {}; });
        BookTagRepository.delete = jest.fn(() => { return true; });
    });

    beforeEach(() => {
        BookRepository.update.mockClear();
        BookRepository.get.mockClear();
        BookTagRepository.create.mockClear();
        BookTagRepository.delete.mockClear();
    });

    test('Should use Book Repository', async () => {
        BookRepository.update.mockImplementation(() => {
            return [];
        });

        BookRepository.get.mockImplementation(() => {
            return {
                dataValues: {
                    Tags: []
                }
            }
        });

        await BookUpdateService.update(1, { title: "test", Tags: []} );
        expect(BookRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 book has been modified', async () => {
        BookRepository.update.mockImplementation(() => {
            return 1;
        });

        const books = await BookUpdateService.update(1, { isbn: 2, title: "data", Tags: []} );
        expect(books).toStrictEqual(1);
    });

    test('Should create all new tags associations and delete olders', async () => {
        BookRepository.update.mockImplementation(() => {
            return 1;
        });

        BookRepository.get.mockImplementation(() => {
            return {
                dataValues: {
                    Tags: []
                }
            }
        });


        let books = await BookUpdateService.update(1, { isbn: 1, title: "data", Tags: [1, 2]} );
        expect(BookTagRepository.create).toBeCalledTimes(2);

        BookRepository.get.mockImplementation(() => {
            return {
                dataValues: {
                    Tags: [
                        {
                            dataValues: {
                                id: 1
                            }
                        },
                        {
                            dataValues: {
                                id: 2
                            }
                        }
                    ]
                }
            }
        });

        books = await BookUpdateService.update(1, {title: "data", Tags: [{ id: 2 }]} );
        expect(BookTagRepository.delete).toBeCalledTimes(1);
    });

    test('Should throw error if Book Repository not returns 1 meaning the book has not been modified', async () => {
        BookRepository.update.mockImplementation(() => {
            return 0;
        });

        try {
            await BookUpdateService.update(1, {title: "data", Tags: []} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the book data");
        }
    });
});