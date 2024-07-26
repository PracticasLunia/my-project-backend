import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserGetService from '../../../services/user/user-get-service.js';
import UserGetController from './user-get-controller.js'

describe('Tests for User Get Controller', () => {
    beforeAll(() => {
        UserGetService.get = jest.fn(UserGetService.get);
    });

    beforeEach(() => {
        UserGetService.get.mockClear();
    });

    test('Shoud call User Get Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserGetController.get(req, res);
        expect(UserGetService.get).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        UserGetService.get.mockImplementation(() => {
            return [1];
        });

        await UserGetController.get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserGetService.get.mockResolvedValue([1]);
        await UserGetController.get(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserGetService.get.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await UserGetController.get(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});