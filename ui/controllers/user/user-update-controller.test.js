import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserUpdateService from '../../../services/user/user-update-service.js';
import UserUpdateController from './user-update-controller.js'

describe('Tests for User Update Controller', () => {
    beforeAll(() => {
        UserUpdateService.update = jest.fn(UserUpdateService.update);
    });

    beforeEach(() => {
        UserUpdateService.update.mockClear();
    });

    test('Shoud call User Find Service', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();

        await UserUpdateController.update(req, res);
        expect(UserUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { name: '', email: ''}});
        const res = mockResponse();
        UserUpdateService.update.mockImplementation(() => {
            return [1];
        });

        await UserUpdateController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserUpdateService.update.mockResolvedValue([1]);
        await UserUpdateController.update(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        UserUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await UserUpdateController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});