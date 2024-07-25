import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import RefreshTokenController from './refresh-token-controller';
import { refreshTokens } from '../../utils/jwt';

describe('Tests for Refresh Token Controller', () => {
    beforeAll(() => {
        // MEJOR SIMULAR jwt y ASI SE TESTEA Utils tmb
        //refreshTokens = jest.fn(() => { return { token: "token", refreshToken: "token"} });
    });

    beforeEach(() => {
        refreshTokens.mockClear();
    });

    test('Shoud call refreshToken Utils', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await RefreshTokenController.refresh(req, res);
        expect(refreshTokens).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await RefreshTokenController.refresh(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the utils funciton', async () => {
        const req = mockRequest();
        const res = mockResponse();
        refreshTokens.mockResolvedValue({ token: "token", refreshToken: "token"});
        await RefreshTokenController.refresh(req, res);

        expect(res.json).toBeCalledWith({ token: "token", refreshToken: "token"});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        refreshTokens.mockImplementation(() => {
            const error = new Error("Something bad happened");
            throw error;
        });
        await RefreshTokenController.refresh(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Something bad happened" });
    });
});