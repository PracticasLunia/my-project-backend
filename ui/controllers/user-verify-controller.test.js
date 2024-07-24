import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserVerifyService from '../../services/user-verify-service.js';
import UserVerifyController from './user-verify-controller.js'

describe('Tests for User Verify Controller', () => {
    beforeAll(() => {
        UserVerifyService.verify = jest.fn(UserVerifyService.verify);
    });

    beforeEach(() => {
        UserVerifyService.verify.mockClear();
    });

    test('Shoud call User Find Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserVerifyController.verify(req, res);
        expect(UserVerifyService.verify).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        UserVerifyService.verify.mockImplementation(() => {
            return [1];
        });

        await UserVerifyController.verify(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserVerifyService.verify.mockResolvedValue([1]);
        await UserVerifyController.verify(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserVerifyService.verify.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserVerifyController.verify(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});