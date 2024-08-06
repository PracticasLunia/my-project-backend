import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserMailVerifyController from '../../../../src/ui/controllers/user/user-mail-verify-controller.js'
import UserVerifyService from '../../../../src/services/user/user-verify-service.js';
import jwt from 'jsonwebtoken';

describe('Tests for User Mail Verify Controller', () => {
    beforeAll(() => {
        UserVerifyService.verify = jest.fn(UserVerifyService.verify);
        jwt.verify = jest.fn(() => { return { id: 1 } });
    });

    beforeEach(() => {
        UserVerifyService.verify.mockClear();
        jwt.verify.mockClear();
    });

    test('Shoud call User Verify Service', async () => {
        const req = mockRequest({ params: { token: 'test-token' }});
        const res = mockResponse();

        await UserMailVerifyController.verify(req, res);
        expect(UserVerifyService.verify).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ params: { token: 'test-token' }});
        const res = mockResponse();
        UserVerifyService.verify.mockImplementation(() => {
            return [1];
        });

        await UserMailVerifyController.verify(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ params: { token: 'test-token' }});
        const res = mockResponse();
        UserVerifyService.verify.mockResolvedValue([1]);
        await UserMailVerifyController.verify(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ params: { token: 'test-token' }});
        const res = mockResponse();
        UserVerifyService.verify.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserMailVerifyController.verify(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });

    test('Should return 401 error if no token provided', async () => {
        const req = mockRequest({ params: {} });
        const res = mockResponse();
        await UserMailVerifyController.verify(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ error: "No token provided" });
    });

    test('Should return 401 error if validation failed', async () => {
        const req = mockRequest({ params: { token: 'test-token' }});
        const res = mockResponse();
        jwt.verify.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserMailVerifyController.verify(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ error: "Failed to authenticate token" });
    });
});