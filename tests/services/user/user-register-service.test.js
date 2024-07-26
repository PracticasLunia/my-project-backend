import bcrypt from 'bcrypt';
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserRegisterService from '../../../src/services/user/user-register-service';
import UserRepository from '../../../src/repositories/user-repository';

describe('Tests for User Register Controller', () => {
    beforeAll(() => {
        UserRepository.create = jest.fn(UserRepository.registerAll);
        bcrypt.hash = jest.fn(() => { return "password"; });
    });

    beforeEach(() => {
        UserRepository.create.mockClear();
    });

    test('Should use User Repository', async () => {
        UserRepository.create.mockImplementation(() => {
            return {};
        });

        await UserRegisterService.register({ password: "pass" });
        expect(UserRepository.create).toBeCalled();
    });

    test('Should return a user', async () => {
        UserRepository.create.mockImplementation(() => {
            return {};
        });

        const users = await UserRegisterService.register({ password: "pass" });
        expect(users).toStrictEqual({});
    });

    test('Should throw error if User Repository not returns a user', async () => {
        UserRepository.create.mockImplementation(() => {
            return null;
        });
        try {
            await UserRegisterService.register({ password: "pass" });
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can not create user");
        }
    });

    test('Should throw error if not given password', async () => {
        UserRepository.create.mockImplementation(() => {
            return null;
        });
        try {
            await UserRegisterService.register({});
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("User data missing");
        }
    });
});