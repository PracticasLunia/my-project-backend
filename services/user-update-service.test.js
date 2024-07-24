import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserUpdateService from './user-update-service';
import UserRepository from '../repositories/user-repository';

describe('Tests for User Update Controller', () => {
    beforeAll(() => {
        UserRepository.update = jest.fn(UserRepository.update);
    });

    beforeEach(() => {
        UserRepository.update.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.update.mockImplementation(() => {
            return [];
        });

        await UserUpdateService.update(1);
        expect(UserRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 user has been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 1;
        });

        const users = await UserUpdateService.update(1);
        expect(users).toStrictEqual(1);
    });

    test('Should throw error if User Repository not returns 1 meaning the user has not been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 0;
        });
        try {
            await UserUpdateService.update(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the user data");
        }
    });
});