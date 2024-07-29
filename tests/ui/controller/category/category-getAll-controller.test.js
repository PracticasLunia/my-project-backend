import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import CategoryGetAllService from '../../../../src/services/category/category-getAll-service.js';
import CategoryGetAllController from '../../../../src/ui/controllers/category/category-getAll-controller.js'

describe('Tests for Category Find Controller', () => {
    beforeAll(() => {
        CategoryGetAllService.getAll = jest.fn(CategoryGetAllService.getAll);
    });

    beforeEach(() => {
        CategoryGetAllService.getAll.mockClear();
    });

    test('Shoud call Category Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await CategoryGetAllController.getAll(req, res);
        expect(CategoryGetAllService.getAll).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        CategoryGetAllService.getAll.mockImplementation(() => {
            return {}
        });

        await CategoryGetAllController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return an empty list on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryGetAllService.getAll.mockResolvedValue([]);
        await CategoryGetAllController.getAll(req, res);

        expect(res.json).toBeCalledWith([]);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryGetAllService.getAll.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await CategoryGetAllController.getAll(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});