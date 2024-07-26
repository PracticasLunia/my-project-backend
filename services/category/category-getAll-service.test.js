import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import CategoryGetAllService from './category-getAll-service.js';
import CategoryRepository from '../../repositories/category-repository.js';

describe('Tests for Category GetAll Service', () => {
    beforeAll(() => {
        CategoryRepository.getAll = jest.fn(CategoryRepository.getAll);
    });

    beforeEach(() => {
        CategoryRepository.getAll.mockClear();
    });

    test('Should use Category Repository', async () => {
        CategoryRepository.getAll.mockImplementation(() => {
            return [];
        });

        await CategoryGetAllService.getAll();
        expect(CategoryRepository.getAll).toBeCalled();
    });

    test('Should return a category list', async () => {
        CategoryRepository.getAll.mockImplementation(() => {
            return [];
        });

        const categorys = await CategoryGetAllService.getAll();
        expect(categorys).toStrictEqual([]);
    });

    test('Should throw error if Category Repository not returns a category list', async () => {
        CategoryRepository.getAll.mockImplementation(() => {
            return null;
        });
        
        try {
            await CategoryGetAllService.getAll();
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No categorys finded");
        }
    });
});