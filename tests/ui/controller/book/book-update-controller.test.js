import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookUpdateService from '../../../../src/services/book/book-update-service.js';
import BookUpdateController from '../../../../src/ui/controllers/book/book-update-controller.js'
import BookCoverService from '../../../../src/services/book/book-cover-service.js';
import BookGetService from '../../../../src/services/book/book-get-service.js';
import PdfReaderService from '../../../../src/services/pdf-reader-service.js';
import BookVectorDeleteService from '../../../../src/services/book/book-vector-delete-service.js';
import BookVectorStoreService from '../../../../src/services/book/book-vector-store-service.js';
import BookFileDeleteService from '../../../../src/services/book/book-file-delete-service.js';
import BookFileSaveService from '../../../../src/services/book/book-file-save-service.js';

describe('Tests for Book Update Controller', () => {
    beforeAll(() => {
        JSON.parse = jest.fn(() => {return { isbn: '', title: '', author: ''}})
        BookUpdateService.update = jest.fn(() => {return [1]});
        PdfReaderService.read = jest.fn(() => {
            return { metadata: {} }
        });
        BookGetService.get = jest.fn(() => {
            return { dataValues: {isbn: '', title: '', author: ''}};
        });
        BookVectorDeleteService.delete = jest.fn(() => {})
        BookVectorStoreService.store = jest.fn(() => {})
        BookFileDeleteService.delete = jest.fn(() => {})
        BookFileSaveService.save = jest.fn(() => {})
    });

    beforeEach(() => {
        JSON.parse.mockClear();
        BookUpdateService.update.mockClear();
        PdfReaderService.read.mockClear();
        BookGetService.get.mockClear();
        BookVectorDeleteService.delete.mockClear();
        BookVectorStoreService.store.mockClear();
        BookFileDeleteService.delete.mockClear();
        BookFileSaveService.save.mockClear();
    });

    test('Shoud call Book Find Service', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: {} }});
        const res = mockResponse();

        await BookUpdateController.update(req, res);
        expect(BookUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { book: ""}, files: { file: {} }});
        const res = mockResponse();

        await BookUpdateController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { book: ""}, files: null});
        const res = mockResponse();
        BookUpdateService.update.mockResolvedValue([1]);
        await BookUpdateController.update(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ body: { book: ""}});
        const res = mockResponse();
        BookUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await BookUpdateController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});