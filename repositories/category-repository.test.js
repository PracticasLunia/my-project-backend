import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import Category from "../models/mysql/category.js";
import CategoryRepository from './category-repository';

describe('Tests for Category Find Controller', () => {
    beforeAll(() => {
        Category.findByPk = jest.fn(() => { return {}; });
        Category.create = jest.fn(() => { return {}; });
        Category.destroy = jest.fn(() => { return 1; });
        Category.update = jest.fn(() => { return {}; });
    });

    beforeEach(() => {
        Category.findByPk.mockClear();
        Category.create.mockClear();
        Category.destroy.mockClear();
        Category.update.mockClear();
    });

    test('All methods should use Category Model', async () => {
        CategoryRepository.get(1);
        CategoryRepository.create({});
        CategoryRepository.delete(1);
        CategoryRepository.update(1, {});

        expect(Category.findByPk).toBeCalled();
        expect(Category.create).toBeCalled();
        expect(Category.destroy).toBeCalled();
        expect(Category.update).toBeCalled();
    });

    test('All methods throw an error if Category model fails', async () => {
        Category.findByPk.mockImplementation(() => { throw new Error(""); });
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
            expect(err.message).toBe("Some field is wrong or category with email already exists");
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
    });
});