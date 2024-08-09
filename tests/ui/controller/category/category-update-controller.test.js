import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import CategoryUpdateService from '../../../../src/services/category/category-update-service.js';
import CategoryUpdateController from '../../../../src/ui/controllers/category/category-update-controller.js'

describe('Tests for Category Update Controller', () => {
    beforeAll(() => {
        CategoryUpdateService.update = jest.fn(CategoryUpdateService.update);
    });

    beforeEach(() => {
        CategoryUpdateService.update.mockClear();
    });

    test('Shoud call Category Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await CategoryUpdateController.update(req, res);
        expect(CategoryUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        CategoryUpdateService.update.mockImplementation(() => {
            return [1];
        });

        await CategoryUpdateController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryUpdateService.update.mockResolvedValue([1]);

        await CategoryUpdateController.update(req, res);
        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await CategoryUpdateController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});