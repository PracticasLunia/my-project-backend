import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import CategoryCreateService from '../../../../src/services/category/category-create-service.js';
import CategoryCreateController from '../../../../src/ui/controllers/category/category-create-controller.js'

describe('Tests for Category Create Controller', () => {
    beforeAll(() => {
        CategoryCreateService.create = jest.fn(() => {});
    });

    beforeEach(() => {
        CategoryCreateService.create.mockClear();
    });

    test('Shoud work', async () => {;
        expect(true).toBeTruthy();
    });
    test('Shoud call Category Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await CategoryCreateController.create(req, res);
        expect(CategoryCreateService.create).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        CategoryCreateService.create.mockImplementation(() => {
            return { title: '', author: ''};
        });

        await CategoryCreateController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        CategoryCreateService.create.mockResolvedValue({ title: '', author: ''});
        await CategoryCreateController.create(req, res);

        expect(res.json).toBeCalledWith({ title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        CategoryCreateService.create.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await CategoryCreateController.create(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});