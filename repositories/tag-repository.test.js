import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import Tag from "../models/mysql/tag.js";
import TagRepository from './tag-repository';

describe('Tests for Tag Find Controller', () => {
    beforeAll(() => {
        Tag.findByPk = jest.fn(() => { return {}; });
        Tag.create = jest.fn(() => { return {}; });
        Tag.destroy = jest.fn(() => { return 1; });
        Tag.update = jest.fn(() => { return {}; });
    });

    beforeEach(() => {
        Tag.findByPk.mockClear();
        Tag.create.mockClear();
        Tag.destroy.mockClear();
        Tag.update.mockClear();
    });

    test('All methods should use Tag Model', async () => {
        TagRepository.get(1);
        TagRepository.create({});
        TagRepository.delete(1);
        TagRepository.update(1, {});

        expect(Tag.findByPk).toBeCalled();
        expect(Tag.create).toBeCalled();
        expect(Tag.destroy).toBeCalled();
        expect(Tag.update).toBeCalled();
    });

    test('All methods throw an error if Tag model fails', async () => {
        Tag.findByPk.mockImplementation(() => { throw new Error(""); });
        Tag.create.mockImplementation(() => { throw new Error(""); });
        Tag.destroy.mockImplementation(() => { throw new Error(""); });
        Tag.update.mockImplementation(() => { throw new Error(""); });

        try {
            await TagRepository.get(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding tag");
        }

        try {
            await TagRepository.create({});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Some field is wrong or tag already exists");
        }

        try {
            await TagRepository.delete(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while deleting tag");
        }

        try {
            await TagRepository.update(1, {});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while updating tag");
        }
    });
});