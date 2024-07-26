import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import CategoryGetService from '../../../src/services/category/category-get-service.js';
import CategoryRepository from '../../../src/repositories/category-repository.js';

describe('Tests for Category Get Service', () => {
    beforeAll(() => {
        CategoryRepository.get = jest.fn(CategoryRepository.get);
    });

    beforeEach(() => {
        CategoryRepository.get.mockClear();
    });

    test('Should use Category Repository', async () => {
        CategoryRepository.get.mockImplementation(() => {
            return [];
        });

        await CategoryGetService.get(1);
        expect(CategoryRepository.get).toBeCalled();
    });

    test('Should return the category that te Repository returns', async () => {
        CategoryRepository.get.mockImplementation(() => {
            return {};
        });

        const categorys = await CategoryGetService.get(1);
        expect(categorys).toStrictEqual({});
    });

    test('Should throw error if Category Repository not returns the category', async () => {
        CategoryRepository.get.mockImplementation(() => {
            return null;
        });
        
        try {
            await CategoryGetService.get(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No category finded");
        }
    });
});