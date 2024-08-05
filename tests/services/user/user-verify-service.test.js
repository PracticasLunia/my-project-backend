import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserVerifyService from '../../../src/services/user/user-verify-service';
import UserRepository from '../../../src/repositories/user-repository';

describe('Tests for User Verify Service', () => {
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

        await UserVerifyService.verify(1);
        expect(UserRepository.update).toBeCalled();
    });

    test('Should return 1 meaning 1 user has been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 1;
        });

        const users = await UserVerifyService.verify(1);
        expect(users).toStrictEqual(1);
    });

    test('Should throw error if User Repository not returns 1 meaning a user has been modified', async () => {
        UserRepository.update.mockImplementation(() => {
            return 0;
        });
        try {
            await UserVerifyService.verify(1);
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Can't verify the user");
        }
    });
});