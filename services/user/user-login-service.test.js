import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserLoginService from './user-login-service';
import UserRepository from '../../repositories/user-repository';

describe('Tests for User Login Controller', () => {
    beforeAll(() => {
        UserRepository.getByEmail = jest.fn(UserRepository.loginAll);
        bcrypt.compare = jest.fn(() => { return true; });
    });

    beforeEach(() => {
        UserRepository.getByEmail.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return {};
        });

        await UserLoginService.login('a', 'a');
        expect(UserRepository.getByEmail).toBeCalled();
    });

    test('Should return a user', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return {};
        });

        const users = await UserLoginService.login('a', 'a');
        expect(users).toStrictEqual({});
    });

    test('Should throw error if User Repository not returns a user', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return null;
        });
        try {
            await UserLoginService.login('a', 'a');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("User does not exists");
        }
    });

    test('Should throw error if not given name or password', async () => {
        UserRepository.getByEmail.mockImplementation(() => {
            return null;
        });
        try {
            await UserLoginService.login('', '');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("User or password missing");
        }
    });

    test('Should throw error if password not match', async () => {
        bcrypt.compare.mockImplementation(() => {
            return false;
        });
        UserRepository.getByEmail.mockImplementation(() => {
            return {};
        });
        try {
            await UserLoginService.login('a', 'a');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Incorrect password");
        }
    });
});