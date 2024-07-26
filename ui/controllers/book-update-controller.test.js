import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookUpdateService from '../../services/book-update-service.js';
import BookUpdateController from './book-update-controller.js'

describe('Tests for Book Update Controller', () => {
    beforeAll(() => {
        BookUpdateService.update = jest.fn(BookUpdateService.update);
    });

    beforeEach(() => {
        BookUpdateService.update.mockClear();
    });

    test('Shoud call Book Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await BookUpdateController.update(req, res);
        expect(BookUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        BookUpdateService.update.mockImplementation(() => {
            return [1];
        });

        await BookUpdateController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookUpdateService.update.mockResolvedValue([1]);
        await BookUpdateController.update(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await BookUpdateController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});