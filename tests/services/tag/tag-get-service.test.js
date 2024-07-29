import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import TagGetService from '../../../src/services/tag/tag-get-service.js';
import TagRepository from '../../../src/repositories/tag-repository.js';

describe('Tests for Tag Get Service', () => {
    beforeAll(() => {
        TagRepository.get = jest.fn(TagRepository.get);
    });

    beforeEach(() => {
        TagRepository.get.mockClear();
    });

    test('Should use Tag Repository', async () => {
        TagRepository.get.mockImplementation(() => {
            return [];
        });

        await TagGetService.get(1);
        expect(TagRepository.get).toBeCalled();
    });

    test('Should return the tag that te Repository returns', async () => {
        TagRepository.get.mockImplementation(() => {
            return {};
        });

        const tags = await TagGetService.get(1);
        expect(tags).toStrictEqual({});
    });

    test('Should throw error if Tag Repository not returns the tag', async () => {
        TagRepository.get.mockImplementation(() => {
            return null;
        });
        
        try {
            await TagGetService.get(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No tag finded");
        }
    });
});