import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserGetService from './user-get-service';
import UserRepository from '../repositories/user-repository';

describe('Tests for User Get Controller', () => {
    beforeAll(() => {
        UserRepository.get = jest.fn(UserRepository.get);
    });

    beforeEach(() => {
        UserRepository.get.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.get.mockImplementation(() => {
            return [];
        });

        await UserGetService.get(1);
        expect(UserRepository.get).toBeCalled();
    });

    test('Should return the user that te Repository returns', async () => {
        UserRepository.get.mockImplementation(() => {
            return {};
        });

        const users = await UserGetService.get(1);
        expect(users).toStrictEqual({});
    });

    test('Should throw error if User Repository not returns the user', async () => {
        UserRepository.get.mockImplementation(() => {
            return null;
        });
        try {
            await UserGetService.get(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No user finded");
        }
    });
});