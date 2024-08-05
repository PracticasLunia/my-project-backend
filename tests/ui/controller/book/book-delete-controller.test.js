import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookDeleteService from '../../../../src/services/book/book-delete-service.js';
import BookDeleteController from '../../../../src/ui/controllers/book/book-delete-controller.js'
import BookGetService from '../../../../src/services/book/book-get-service.js';
import BookVectorDeleteService from '../../../../src/services/book/book-vector-delete-service.js';
import BookFileDeleteService from '../../../../src/services/book/book-file-delete-service.js';

describe('Tests for Book Delete Controller', () => {
    beforeAll(() => {
        BookDeleteService.delete = jest.fn(BookDeleteService.delete);
        BookGetService.get = jest.fn(() => {return {}});
        BookVectorDeleteService.delete = jest.fn(() => {return void 1});
        BookFileDeleteService.delete = jest.fn(() => {})
    });

    beforeEach(() => {
        BookDeleteService.delete.mockClear();
        BookGetService.get.mockClear();
        BookVectorDeleteService.delete.mockClear();
        BookFileDeleteService.delete.mockClear();
    });

    test('Shoud call Book Delete Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await BookDeleteController.delete(req, res);
        expect(BookDeleteService.delete).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();
        BookDeleteService.delete.mockImplementation(() => {
            return [1];
        });

        await BookDeleteController.delete(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookDeleteService.delete.mockResolvedValue([1]);
        await BookDeleteController.delete(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookDeleteService.delete.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await BookDeleteController.delete(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});