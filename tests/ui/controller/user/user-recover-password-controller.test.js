import jwt from 'jsonwebtoken'
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserRecoverPasswordController from '../../../../src/ui/controllers/user/user-recover-password-controller.js';
import JWTUtils from '../../../../src/utils/jwt.js';
import UserGetEmailService from '../../../../src/services/user/user-get-email-service.js';

describe('Tests for User Recover Password Controller', () => {
    beforeAll(() => {
        jwt.sign = jest.fn(() => { return { dataValues: {email: 'test@email.com'}} });
        JWTUtils.generateTokens = jest.fn(JWTUtils.generateTokens);
        UserGetEmailService.get = jest.fn(() => { return { dataValues: {email: 'test@email.com'} } })
    });

    beforeEach(() => {
        jwt.sign.mockClear();
        JWTUtils.generateTokens.mockClear();
        UserGetEmailService.get.mockClear();
    });

    test('Shoud call refreshToken Utils', async () => {
        const req = mockRequest({ body: { email: "test@email.es"}});
        const res = mockResponse();

        await UserRecoverPasswordController.recover(req, res);
        expect(JWTUtils.generateTokens).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { email: "test@email.es"}});
        const res = mockResponse();

        await UserRecoverPasswordController.recover(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the Get Email Service funciton', async () => {
        const req = mockRequest({ body: { email: "test@email.es"}});
        const res = mockResponse();

        await UserRecoverPasswordController.recover(req, res);
        expect(UserGetEmailService.get).toBeCalled();
        expect(res.json).toBeCalledWith({ dataValues: {email: 'test@email.com'}});
    });

    test('Should return 400 error and a error message on response if utils function fails', async () => {
        const req = mockRequest({ body: { email: "test@email.es"}});
        const res = mockResponse();
        jwt.sign.mockImplementation(() => {
            const error = new Error("Something bad happened");
            throw error;
        });
        await UserRecoverPasswordController.recover(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: 'Something bad happened' });
    });
});