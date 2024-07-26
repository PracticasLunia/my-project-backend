import jwt from 'jsonwebtoken'
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserLoginService from '../../../../src/services/user/user-login-service.js';
import UserLoginController from '../../../../src/ui/controllers/user/user-login-controller.js'

describe('Tests for User Login Controller', () => {
    beforeAll(() => {
        UserLoginService.login = jest.fn(UserLoginService.login);
        jwt.sign = jest.fn(() => { return 'test-token' });
    });

    beforeEach(() => {
        UserLoginService.login.mockClear();
    });

    test('Shoud call User Login Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserLoginController.login(req, res);
        expect(UserLoginService.login).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        const user = {
            id: 1,
            name: "a",
            email: "a@a.a",
            password: "a",
            admin: false,
        }
        UserLoginService.login.mockResolvedValue(user)

        await UserLoginController.login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return a user on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const user = {
            id: 1,
            name: "a",
            email: "a@a.a",
            password: "a",
            admin: false,
        }

        UserLoginService.login.mockResolvedValue(user)
        await UserLoginController.login(req, res);
        expect(res.json).toBeCalledWith(user);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserLoginService.login.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await UserLoginController.login(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});