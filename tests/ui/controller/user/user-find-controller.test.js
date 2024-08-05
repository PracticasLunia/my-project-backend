import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserFindService from '../../../../src/services/user/user-find-service.js';
import UserFindController from '../../../../src/ui/controllers/user/user-find-controller.js'

describe('Tests for User Find Controller', () => {
    beforeAll(() => {
        UserFindService.find = jest.fn(UserFindService.find);
    });

    beforeEach(() => {
        UserFindService.find.mockClear();
    });

    test('Shoud call User Find Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserFindController.find(req, res);
        expect(UserFindService.find).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        UserFindService.find.mockImplementation(() => {
            return {}
        });

        await UserFindController.find(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return an empty list on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserFindService.find.mockResolvedValue([]);
        await UserFindController.find(req, res);

        expect(res.json).toBeCalledWith([]);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserFindService.find.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserFindController.find(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});