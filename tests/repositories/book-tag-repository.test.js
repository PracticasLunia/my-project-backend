import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookTag from "../../src/models/mysql/book-tag.js";
import BookTagRepository from '../../src/repositories/book-tag-repository.js';

describe('Tests for BookTag Find Controller', () => {
    beforeAll(() => {
        BookTag.create = jest.fn(() => { return {}; });
        BookTag.destroy = jest.fn(() => { return 1; });
    });

    beforeEach(() => {
        BookTag.create.mockClear();
        BookTag.destroy.mockClear();
    });

    test('All methods should use BookTag Model', async () => {
        BookTagRepository.create({});
        BookTagRepository.delete(1);

        expect(BookTag.create).toBeCalled();
        expect(BookTag.destroy).toBeCalled();
    });

    test('All methods throw an error if BookTag model fails', async () => {
        BookTag.create.mockImplementation(() => { throw new Error(""); });
        BookTag.destroy.mockImplementation(() => { throw new Error(""); });

        try {
            await BookTagRepository.create({});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Some field is wrong or bookTag already exists");
        }

        try {
            await BookTagRepository.delete(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while deleting bookTag");
        }
    });
});