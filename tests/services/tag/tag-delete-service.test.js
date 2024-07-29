import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import TagDeleteService from '../../../src/services/tag/tag-delete-service.js';
import TagRepository from '../../../src/repositories/tag-repository.js';

describe('Tests for Tag Delete Service', () => {
    beforeAll(() => {
        TagRepository.delete = jest.fn(TagRepository.delete);
    });

    beforeEach(() => {
        TagRepository.delete.mockClear();
    });

    test('Should use Tag Repository', async () => {
        TagRepository.delete.mockImplementation(() => {
            return [];
        });

        await TagDeleteService.delete(1);
        expect(TagRepository.delete).toBeCalled();
    });

    test('Should return the tag that te Repository returns', async () => {
        TagRepository.delete.mockImplementation(() => {
            return {};
        });

        const tags = await TagDeleteService.delete(1);
        expect(tags).toStrictEqual({});
    });

    test('Should throw error if Tag Repository not returns the tag', async () => {
        TagRepository.delete.mockImplementation(() => {
            return null;
        });
        
        try {
            await TagDeleteService.delete(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No tag finded");
        }
    });
});