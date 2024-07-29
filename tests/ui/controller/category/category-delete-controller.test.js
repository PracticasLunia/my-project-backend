import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import CategoryDeleteService from '../../../../src/services/category/category-delete-service.js';
import CategoryDeleteController from '../../../../src/ui/controllers/category/category-delete-controller.js'

describe('Tests for Category Delete Controller', () => {
    beforeAll(() => {
        CategoryDeleteService.delete = jest.fn(CategoryDeleteService.delete);
    });

    beforeEach(() => {
        CategoryDeleteService.delete.mockClear();
    });

    test('Shoud call Category Delete Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await CategoryDeleteController.delete(req, res);
        expect(CategoryDeleteService.delete).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();
        CategoryDeleteService.delete.mockImplementation(() => {
            return [1];
        });

        await CategoryDeleteController.delete(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryDeleteService.delete.mockResolvedValue([1]);
        await CategoryDeleteController.delete(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryDeleteService.delete.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await CategoryDeleteController.delete(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});