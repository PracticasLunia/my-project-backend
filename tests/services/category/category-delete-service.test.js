import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import CategoryDeleteService from '../../../src/services/category/category-delete-service.js';
import CategoryRepository from '../../../src/repositories/category-repository.js';

describe('Tests for Category Delete Service', () => {
    beforeAll(() => {
        CategoryRepository.delete = jest.fn(CategoryRepository.delete);
    });

    beforeEach(() => {
        CategoryRepository.delete.mockClear();
    });

    test('Should use Category Repository', async () => {
        CategoryRepository.delete.mockImplementation(() => {
            return [];
        });

        await CategoryDeleteService.delete(1);
        expect(CategoryRepository.delete).toBeCalled();
    });

    test('Should return the category that te Repository returns', async () => {
        CategoryRepository.delete.mockImplementation(() => {
            return {};
        });

        const categorys = await CategoryDeleteService.delete(1);
        expect(categorys).toStrictEqual({});
    });

    test('Should throw error if Category Repository not returns the category', async () => {
        CategoryRepository.delete.mockImplementation(() => {
            return null;
        });
        
        try {
            await CategoryDeleteService.delete(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No category finded");
        }
    });
});