import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import TagGetAllService from '../../../src/services/tag/tag-getAll-service.js';
import TagRepository from '../../../src/repositories/tag-repository.js';

describe('Tests for Tag GetAll Service', () => {
    beforeAll(() => {
        TagRepository.getAll = jest.fn(TagRepository.getAll);
    });

    beforeEach(() => {
        TagRepository.getAll.mockClear();
    });

    test('Should use Tag Repository', async () => {
        TagRepository.getAll.mockImplementation(() => {
            return [];
        });

        await TagGetAllService.getAll();
        expect(TagRepository.getAll).toBeCalled();
    });

    test('Should return a tag list', async () => {
        TagRepository.getAll.mockImplementation(() => {
            return [];
        });

        const tags = await TagGetAllService.getAll();
        expect(tags).toStrictEqual([]);
    });

    test('Should throw error if Tag Repository not returns a tag list', async () => {
        TagRepository.getAll.mockImplementation(() => {
            return null;
        });
        
        try {
            await TagGetAllService.getAll();
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No tags finded");
        }
    });
});