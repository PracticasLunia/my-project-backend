import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import User from "../../src/models/mysql/user.js";
import UserRepository from '../../src/repositories/user-repository.js';

describe('Tests for User Find Controller', () => {
    beforeAll(() => {
        User.findByPk = jest.fn(() => { return {}; });
        User.findOne = jest.fn(() => { return {}; });
        User.create = jest.fn(() => { return {}; });
        User.destroy = jest.fn(() => { return 1; });
        User.update = jest.fn(() => { return {}; });
        User.findAll = jest.fn(() => { return [{}]; });
    });

    beforeEach(() => {
        User.findByPk.mockClear();
        User.findOne.mockClear();
        User.create.mockClear();
        User.destroy.mockClear();
        User.update.mockClear();
        User.findAll.mockClear();
    });

    test('All methods should use User Model', async () => {
        UserRepository.get(1);
        UserRepository.getByEmail();
        UserRepository.create({});
        UserRepository.delete(1);
        UserRepository.update(1, {});
        UserRepository.findAll();

        expect(User.findByPk).toBeCalled();
        expect(User.findOne).toBeCalled();
        expect(User.create).toBeCalled();
        expect(User.destroy).toBeCalled();
        expect(User.update).toBeCalled();
        expect(User.findAll).toBeCalled();
    });

    test('All methods throw an error if User model fails', async () => {
        User.findByPk.mockImplementation(() => { throw new Error(""); });
        User.findOne.mockImplementation(() => { throw new Error(""); });
        User.create.mockImplementation(() => { throw new Error(""); });
        User.destroy.mockImplementation(() => { throw new Error(""); });
        User.update.mockImplementation(() => { throw new Error(""); });
        User.findAll.mockImplementation(() => { throw new Error(""); });

        try {
            await UserRepository.get(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding user");
        }

        try {
            await UserRepository.getByEmail();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding user");
        }

        try {
            await UserRepository.create({});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Some field is wrong or user with email already exists");
        }

        try {
            await UserRepository.delete(1);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while deleting user");
        }

        try {
            await UserRepository.update(1, {});
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while updating user");
        }

        try {
            await UserRepository.findAll();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Error while finding users");
        }
    });
});