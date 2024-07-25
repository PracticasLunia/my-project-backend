import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserIsAdminController from './user-is-admin-controller';

describe('Tests for User Is Admin Controller', () => {
    test('Should return code 200 on response ', async () => {
        const req = mockRequest({user: {}});
        const res = mockResponse();

        await UserIsAdminController.isAdmin(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return a empty dict on response', async () => {
        const req = mockRequest({user: {}});
        const res = mockResponse();

        await UserIsAdminController.isAdmin(req, res);
        expect(res.json).toBeCalledWith({});
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await UserIsAdminController.isAdmin(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Something bad happened" });
    });
});