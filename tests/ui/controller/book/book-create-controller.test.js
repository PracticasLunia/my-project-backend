import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookCreateService from '../../../../src/services/book/book-create-service.js';
import BookCreateController from '../../../../src/ui/controllers/book/book-create-controller.js'
import PdfReaderService from '../../../../src/services/pdf-reader-service.js';
import BookVectorStoreService from '../../../../src/services/book/book-vector-store-service.js';
import BookCoverService from '../../../../src/services/book/book-cover-service.js';

describe('Tests for Book Create Controller', () => {
    beforeAll(() => {
        BookCreateService.create = jest.fn(() => {});
        JSON.parse = jest.fn(() => {return { isbn: '', title: '', author: ''}})
        BookCoverService.cover = jest.fn(() => {return { isbn: '', title: '', author: ''}})
        PdfReaderService.read = jest.fn(() => {
            return { metadata: {} }
        });
        BookVectorStoreService.store = jest.fn(() => {})
    });

    beforeEach(() => {
        BookCreateService.create.mockClear();
        JSON.parse.mockClear();
        BookCoverService.cover.mockClear();
        PdfReaderService.read.mockClear();
        BookVectorStoreService.store.mockClear();
    });

    test('Shoud work', async () => {;
        expect(true).toBeTruthy();
    });
    test('Shoud call Book Find Service', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: { metadata: {} } }});
        const res = mockResponse();

        await BookCreateController.create(req, res);
        expect(BookCreateService.create).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: { metadata: {} } }});
        const res = mockResponse();
        BookCreateService.create.mockImplementation(() => {
            return { title: '', author: ''};
        });

        await BookCreateController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: { metadata: {} } }});
        const res = mockResponse();
        await BookCreateController.create(req, res);

        expect(res.json).toBeCalledWith({ isbn: '', title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: { metadata: {} } }});
        const res = mockResponse();
        BookCreateService.create.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await BookCreateController.create(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});