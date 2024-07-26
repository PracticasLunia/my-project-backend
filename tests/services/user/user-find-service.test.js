import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserFindService from '../../../src/services/user/user-find-service';
import UserRepository from '../../../src/repositories/user-repository';

describe('Tests for User Find Controller', () => {
    beforeAll(() => {
        UserRepository.findAll = jest.fn(UserRepository.findAll);
    });

    beforeEach(() => {
        UserRepository.findAll.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.findAll.mockImplementation(() => {
            return [];
        });

        await UserFindService.find('', '');
        expect(UserRepository.findAll).toBeCalled();
    });

    test('Should return a user list', async () => {
        UserRepository.findAll.mockImplementation(() => {
            return [];
        });

        const users = await UserFindService.find('', '');
        expect(users).toStrictEqual([]);
    });

    test('Should throw error if User Repository not returns a user list', async () => {
        UserRepository.findAll.mockImplementation(() => {
            return null;
        });
        try {
            await UserFindService.find('', '');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No users finded");
        }
    });
});