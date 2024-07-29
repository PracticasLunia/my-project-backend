import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import TagUpdateService from '../../../src/services/tag/tag-update-service.js';
import TagRepository from '../../../src/repositories/tag-repository.js';

describe('Tests for Tag Update Service', () => {
    beforeAll(() => {
        TagRepository.get = jest.fn(TagRepository.get);
        TagRepository.update = jest.fn(TagRepository.update);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        TagRepository.update.mockClear();
    });

    test('Should use Tag Repository', async () => {
        TagRepository.update.mockImplementation(() => {
            return [];
        });

        await TagUpdateService.update(1, { title: "test"} );
        expect(TagRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 tag has been modified', async () => {
        TagRepository.update.mockImplementation(() => {
            return 1;
        });

        const tags = await TagUpdateService.update(1, {title: "data"} );
        expect(tags).toStrictEqual(1);
    });

    test('Should throw error if Tag Repository not returns 1 meaning the tag has not been modified', async () => {
        TagRepository.update.mockImplementation(() => {
            return 0;
        });

        try {
            await TagUpdateService.update(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the tag data");
        }
    });
});