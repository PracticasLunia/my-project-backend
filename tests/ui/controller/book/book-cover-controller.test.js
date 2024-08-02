import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookCoverService from '../../../../src/services/book/book-cover-service.js';
import BookCoverController from '../../../../src/ui/controllers/book/book-cover-controller.js'
import BookGetService from '../../../../src/services/book/book-get-service.js';

describe('Tests for Book Cover Controller', () => {
    beforeAll(() => {
        BookCoverService.cover = jest.fn(() => {
            return { isbn: '', title: '', author: ''};
        });
        BookGetService.get = jest.fn(() => {
            return { isbn: '', title: '', author: ''};
        });
    });

    beforeEach(() => {
        BookCoverService.cover.mockClear();
        BookGetService.get.mockClear();
    });

    test('Shoud call Book Cover Service & Book Get Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await BookCoverController.cover(req, res);
        expect(BookGetService.get).toBeCalled();
        expect(BookCoverService.cover).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await BookCoverController.cover(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        await BookCoverController.cover(req, res);
        expect(res.json).toBeCalledWith({ isbn: '', title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        BookCoverService.cover.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await BookCoverController.cover(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});