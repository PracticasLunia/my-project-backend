import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserUpdatePasswordController from '../../../../src/ui/controllers/user/user-update-password-controller.js'
import UserUpdateService from '../../../../src/services/user/user-update-service.js';
import jwt from 'jsonwebtoken';

describe('Tests for User Update Password Controller', () => {
    beforeAll(() => {
        UserUpdateService.update = jest.fn(() => { return {} });
        jwt.verify = jest.fn(() => { return { id: 1 } });
    });

    beforeEach(() => {
        UserUpdateService.update.mockClear();
        jwt.verify.mockClear();
    });

    test('Shoud call User Verify Service and validate token', async () => {
        const req = mockRequest({ params: { token: 'test-token' }, body: { password: 'test' }});
        const res = mockResponse();

        await UserUpdatePasswordController.update(req, res);
        expect(jwt.verify).toBeCalled();
        expect(UserUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ params: { token: 'test-token' }, body: { password: 'test' }});
        const res = mockResponse();

        await UserUpdatePasswordController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ params: { token: 'test-token' }, body: { password: 'test' }});
        const res = mockResponse();

        await UserUpdatePasswordController.update(req, res);
        expect(res.json).toBeCalledWith({});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ params: { token: 'test-token' }, body: { password: 'test' }});
        const res = mockResponse();
        UserUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await UserUpdatePasswordController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});