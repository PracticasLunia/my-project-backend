import jwt from 'jsonwebtoken'
import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserRefreshTokenController from '../../../../src/ui/controllers/user/user-refresh-token-controller.js';
import JWTUtils from '../../../../src/utils/jwt.js';

describe('Tests for User Refresh Token Controller', () => {
    beforeAll(() => {
        jwt.sign = jest.fn(() => { return 'test-token' });
        jwt.verify = jest.fn(() => { return { id: 1, name: "test"} });
        JWTUtils.refreshTokens = jest.fn(JWTUtils.refreshTokens);
    });

    beforeEach(() => {
        jwt.sign.mockClear();
        jwt.verify.mockClear();
        JWTUtils.refreshTokens.mockClear();
    });

    test('Shoud call refreshToken Utils', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer test-token"}});
        const res = mockResponse();

        await UserRefreshTokenController.refresh(req, res);
        expect(JWTUtils.refreshTokens).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer test-token"}});
        const res = mockResponse();

        await UserRefreshTokenController.refresh(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the utils funciton', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer test-token"}});
        const res = mockResponse();
        jwt.verify.mockImplementation(() => { return { token: "test-token", refreshToken: "test-token"} });

        await UserRefreshTokenController.refresh(req, res);
        expect(res.json).toBeCalledWith({ token: "test-token", refreshToken: "test-token"});
    });

    test('Should return 401 error and a error message on response if utils function fails', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer test-token"}});
        const res = mockResponse();
        jwt.sign.mockImplementation(() => {
            const error = new Error("Something bad happened");
            throw error;
        });
        await UserRefreshTokenController.refresh(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ error: 'Failed to authenticate refresh token' });
    });

    test('Should return 401 error and a error message on response if no refresh token provided', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer"}});
        const res = mockResponse();

        await UserRefreshTokenController.refresh(req, res);
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ error: 'No refresh token provided' });
    });

    test('Should return 400 error on response if no authorization header provided', async () => {
        const req = mockRequest({ headers: { authorization: ""}});
        const res = mockResponse();

        await UserRefreshTokenController.refresh(req, res);
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ error: 'No refresh token provided' });
    });

    test('Should return 400 error and a error message on response if refreshTokens utils function failed', async () => {
        const req = mockRequest({ headers: { authorization: "Bearer"}});
        const res = mockResponse();
        JWTUtils.refreshTokens.mockImplementation(() => {
            const error = new Error("Something bad happened");
            throw error;
        });

        await UserRefreshTokenController.refresh(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Something bad happened" });
    });
});