import jwt from 'jsonwebtoken'
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserRegisterService from '../../services/user-register-service.js';
import UserRegisterController from './user-register-controller.js'

describe('Tests for User Register Controller', () => {
    beforeAll(() => {
        UserRegisterService.register = jest.fn(UserRegisterService.register);
        jwt.sign = jest.fn(() => { return 'test-token' });
    });

    beforeEach(() => {
        UserRegisterService.register.mockClear();
    });

    test('Shoud call User Register Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserRegisterController.register(req, res);
        expect(UserRegisterService.register).toBeCalled();
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
        UserRegisterService.register.mockResolvedValue(user)

        await UserRegisterController.register(req, res);
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

        UserRegisterService.register.mockResolvedValue(user)
        await UserRegisterController.register(req, res);
        expect(res.json).toBeCalledWith(user);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserRegisterService.register.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserRegisterController.register(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});