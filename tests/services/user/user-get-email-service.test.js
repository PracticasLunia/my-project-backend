import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserGetEmailService from '../../../src/services/user/user-get-email-service.js';
import UserRepository from '../../../src/repositories/user-repository.js';

describe('Tests for User Get Controller', () => {
    beforeAll(() => {
        UserRepository.getByEmail = jest.fn(UserRepository.get);
    });

    beforeEach(() => {
        UserRepository.getByEmail.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return [];
        });

        await UserGetEmailService.get(1);
        expect(UserRepository.getByEmail).toBeCalled();
    });

    test('Should return the user that te Repository returns', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return {};
        });

        const users = await UserGetEmailService.get(1);
        expect(users).toStrictEqual({});
    });

    test('Should throw error if User Repository not returns the user', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return null;
        });
        try {
            await UserGetEmailService.get(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("No user finded");
        }
    });
});