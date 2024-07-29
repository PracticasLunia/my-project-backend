import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookGetService from '../../../../src/services/book/book-get-service.js';
import BookGetController from '../../../../src/ui/controllers/book/book-get-controller.js'

describe('Tests for Book Get Controller', () => {
    beforeAll(() => {
        BookGetService.get = jest.fn(BookGetService.get);
    });

    beforeEach(() => {
        BookGetService.get.mockClear();
    });

    test('Shoud call Book Get Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await BookGetController.get(req, res);
        expect(BookGetService.get).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();
        BookGetService.get.mockImplementation(() => {
            return [1];
        });

        await BookGetController.get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookGetService.get.mockResolvedValue([1]);
        await BookGetController.get(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookGetService.get.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await BookGetController.get(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});