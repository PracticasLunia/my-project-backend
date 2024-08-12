import jwt from 'jsonwebtoken'
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserRegisterService from '../../../../src/services/user/user-register-service.js';
import UserRegisterController from '../../../../src/ui/controllers/user/user-register-controller.js'
import UserGeneratePreferencesService from '../../../../src/services/user/user-generate-preferences-service.js';
import UserSendVerifyMailService from '../../../../src/services/user/user-send-verify-mail-service.js';

describe('Tests for User Register Controller', () => {
    beforeAll(() => {
        UserRegisterService.register = jest.fn(UserRegisterService.register);
        UserGeneratePreferencesService.generate = jest.fn(() => { return "test" });
        UserSendVerifyMailService.send = jest.fn(() => { return void 1 });
        jwt.sign = jest.fn(() => { return 'test-token' });
    });

    beforeEach(() => {
        UserRegisterService.register.mockClear();
        UserGeneratePreferencesService.generate.mockClear();
        UserSendVerifyMailService.send.mockClear();
    });

    test('Shoud call User Register Service, User Generate Preferences Service & User Send Mail Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserRegisterController.register(req, res);
        expect(UserRegisterService.register).toBeCalled();
        expect(UserGeneratePreferencesService.generate).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        const user = {
            dataValues: {
                id: 1,
                name: "a",
                email: "a@a.a",
                password: "a",
                admin: false,
            }
        }
        UserRegisterService.register.mockResolvedValue(user)

        await UserRegisterController.register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return a user on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const user = {
            dataValues: {
                id: 1,
                name: "a",
                email: "a@a.a",
                password: "a",
                admin: false,
            }
        }

        UserRegisterService.register.mockResolvedValue(user)
        await UserRegisterController.register(req, res);
        expect(res.json).toBeCalledWith({token: 'test-token', refreshToken: 'test-token'});
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserRegisterService.register.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await UserRegisterController.register(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});