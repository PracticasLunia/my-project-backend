import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import TagCreateService from '../../../src/services/tag/tag-create-service.js';
import TagRepository from '../../../src/repositories/tag-repository.js';

describe('Tests for Tag Create Service', () => {
    beforeAll(() => {
        TagRepository.create = jest.fn(TagRepository.create);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        TagRepository.create.mockClear();
    });

    test('Should use Tag Repository', async () => {
        TagRepository.create.mockImplementation(() => {
            return [];
        });

        await TagCreateService.create(1, { title: "test"} );
        expect(TagRepository.create).toBeCalled();
    });

    test('Should return 1 meaning 1 tag has been modified', async () => {
        TagRepository.create.mockImplementation(() => {
            return 1;
        });

        const tags = await TagCreateService.create(1, {title: "data"} );
        expect(tags).toStrictEqual(1);
    });

    test('Should throw error if Tag Repository not returns 1 meaning the tag has not been modified', async () => {
        TagRepository.create.mockImplementation(() => {
            return 0;
        });

        try {
            await TagCreateService.create(1, {title: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't create the tag data");
        }
    });
});