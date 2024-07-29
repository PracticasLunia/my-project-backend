import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserUpdateService from '../../../src/services/user/user-update-service';
import UserRepository from '../../../src/repositories/user-repository';

describe('Tests for User Update Controller', () => {
    beforeAll(() => {
        UserRepository.get = jest.fn(UserRepository.get);
        UserRepository.update = jest.fn(UserRepository.update);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        UserRepository.update.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.update.mockImplementation(() => {
            return [];
        });
        UserRepository.get.mockImplementation(() => {
            return { password: "test"};
        });

        await UserUpdateService.update(1, {password: "test"} );
        expect(UserRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 user has been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 1;
        });
        UserRepository.get.mockImplementation(() => {
            return { password: "test"};
        });

        const users = await UserUpdateService.update(1, {password: "data"} );
        expect(users).toStrictEqual(1);
    });

    test('Should throw error if User Repository not returns 1 meaning the user has not been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 0;
        });
        UserRepository.get.mockImplementation(() => {
            return { password: "test"};
        });
        try {
            await UserUpdateService.update(1, {password: "data"} );
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't update the user data");
        }
    });
});