import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import CategoryUpdateService from '../../../src/services/category/category-update-service.js';
import CategoryRepository from '../../../src/repositories/category-repository.js';

describe('Tests for Category Update Service', () => {
    beforeAll(() => {
        CategoryRepository.get = jest.fn(CategoryRepository.get);
        CategoryRepository.update = jest.fn(CategoryRepository.update);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        CategoryRepository.update.mockClear();
    });

    test('Should use Category Repository', async () => {
        CategoryRepository.update.mockImplementation(() => {
            return [];
        });

        await CategoryUpdateService.update(1, { title: "test"} );
        expect(CategoryRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 category has been modified', async () => {
        CategoryRepository.update.mockImplementation(() => {
            return 1;
        });

        const categorys = await CategoryUpdateService.update(1, {title: "data"} );
        expect(categorys).toStrictEqual(1);
    });

    test('Should throw error if Category Repository not returns 1 meaning the category has not been modified', async () => {
        CategoryRepository.update.mockImplementation(() => {
            return 0;
        });

        try {
            await CategoryUpdateService.update(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the category data");
        }
    });
});