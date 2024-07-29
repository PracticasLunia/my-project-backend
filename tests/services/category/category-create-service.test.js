import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import CategoryCreateService from '../../../src/services/category/category-create-service.js';
import CategoryRepository from '../../../src/repositories/category-repository.js';

describe('Tests for Category Create Service', () => {
    beforeAll(() => {
        CategoryRepository.create = jest.fn(CategoryRepository.create);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        CategoryRepository.create.mockClear();
    });

    test('Should use Category Repository', async () => {
        CategoryRepository.create.mockImplementation(() => {
            return [];
        });

        await CategoryCreateService.create(1, { title: "test"} );
        expect(CategoryRepository.create).toBeCalled();
    });

    test('Should return 1 meaning 1 category has been modified', async () => {
        CategoryRepository.create.mockImplementation(() => {
            return 1;
        });

        const categorys = await CategoryCreateService.create(1, {title: "data"} );
        expect(categorys).toStrictEqual(1);
    });

    test('Should throw error if Category Repository not returns 1 meaning the category has not been modified', async () => {
        CategoryRepository.create.mockImplementation(() => {
            return 0;
        });

        try {
            await CategoryCreateService.create(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't create the category data");
        }
    });
});