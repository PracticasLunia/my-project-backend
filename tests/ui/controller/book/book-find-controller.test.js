import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookFindService from '../../../../src/services/book/book-find-service.js';
import BookFindController from '../../../../src/ui/controllers/book/book-find-controller.js'

describe('Tests for Book Find Controller', () => {
    beforeAll(() => {
        BookFindService.find = jest.fn(BookFindService.find);
    });

    beforeEach(() => {
        BookFindService.find.mockClear();
    });

    test('Shoud call Book Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await BookFindController.find(req, res);
        expect(BookFindService.find).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        BookFindService.find.mockImplementation(() => {
            return {}
        });

        await BookFindController.find(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return an empty list on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookFindService.find.mockResolvedValue([]);
        await BookFindController.find(req, res);

        expect(res.json).toBeCalledWith([]);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookFindService.find.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await BookFindController.find(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});