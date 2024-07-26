import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserIsVerifiedController from './user-is-verified-controller';

describe('Tests for User Is Verified Controller', () => {
    test('Should return code 200 on response ', async () => {
        const req = mockRequest();
        const res = mockResponse({locals: {user: {}}});

        await UserIsVerifiedController.isVerified(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return a empty dict on response', async () => {
        const req = mockRequest();
        const res = mockResponse({locals: {user: {}}});

        await UserIsVerifiedController.isVerified(req, res);
        expect(res.json).toBeCalledWith({});
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await UserIsVerifiedController.isVerified(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Something bad happened" });
    });
});