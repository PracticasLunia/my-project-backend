import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import CategoryGetService from '../../../services/category/category-get-service.js';
import CategoryGetController from './category-get-controller.js'

describe('Tests for Category Get Controller', () => {
    beforeAll(() => {
        CategoryGetService.get = jest.fn(CategoryGetService.get);
    });

    beforeEach(() => {
        CategoryGetService.get.mockClear();
    });

    test('Shoud call Category Get Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await CategoryGetController.get(req, res);
        expect(CategoryGetService.get).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();
        CategoryGetService.get.mockImplementation(() => {
            return [1];
        });

        await CategoryGetController.get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryGetService.get.mockResolvedValue([1]);
        await CategoryGetController.get(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryGetService.get.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await CategoryGetController.get(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});