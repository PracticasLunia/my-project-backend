import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import Category from "../../src/models/mysql/category.js";
import CategoryRepository from '../../src/repositories/category-repository.js';

describe('Tests for Category Find Controller', () => {
    beforeAll(() => {
        Category.findByPk = jest.fn(() => { return {}; });
        Category.create = jest.fn(() => { return {}; });
        Category.findAll = jest.fn(() => { return [{}]; });
        Category.destroy = jest.fn(() => { return 1; });
        Category.update = jest.fn(() => { return {}; });
    });

    beforeEach(() => {
        Category.findByPk.mockClear();
        Category.create.mockClear();
        Category.findAll.mockClear();
        Category.destroy.mockClear();
        Category.update.mockClear();
    });

    test('All methods should use Category Model', async () => {
        CategoryRepository.get(1);
        CategoryRepository.create({});
        CategoryRepository.delete(1);
        CategoryRepository.update(1, {});
        CategoryRepository.getAll();

        expect(Category.findByPk).toBeCalled();
        expect(Category.create).toBeCalled();
        expect(Category.destroy).toBeCalled();
        expect(Category.findAll).toBeCalled();
        expect(Category.update).toBeCalled();
    });

    test('All methods throw an error if Category model fails', async () => {
        Category.findByPk.mockImplementation(() => { throw new Error(""); });
        Category.findAll.mockImplementation(() => { throw new Error(""); });
        Category.create.mockImplementation(() => { throw new Error(""); });
        Category.destroy.mockImplementation(() => { throw new Error(""); });
        Category.update.mockImplementation(() => { throw new Error(""); });

        try {
            await CategoryRepository.get(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding category");
        }

        try {
            await CategoryRepository.create({});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Some field is wrong or category already exists");
        }

        try {
            await CategoryRepository.delete(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while deleting category");
        }

        try {
            await CategoryRepository.update(1, {});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while updating category");
        }

        try {
            await CategoryRepository.getAll();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while getting categories");
        }
    });
});