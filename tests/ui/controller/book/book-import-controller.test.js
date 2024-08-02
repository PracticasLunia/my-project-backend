import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookImportService from '../../../../src/services/book/book-import-service.js';
import BookImportController from '../../../../src/ui/controllers/book/book-import-controller.js'
import BookCoverService from '../../../../src/services/book/book-cover-service.js';
import PdfReaderService from '../../../../src/services/pdf-reader-service.js';
import BookVectorStoreService from '../../../../src/services/book/book-vector-store-service.js';

describe('Tests for Book Import Controller', () => {
    beforeAll(() => {
        BookImportService.import = jest.fn(() => {
            return { isbn: '', title: '', author: ''};
        });
        BookCoverService.cover = jest.fn(() => {
            return { isbn: '', title: '', author: ''};
        });
        PdfReaderService.read = jest.fn(() => {
            return [{ pageContent: 'fake page content', metadata: { isbn: '', title: '', author: ''} }];
        });
        BookVectorStoreService.store = jest.fn(() => {return void 1;})
    });

    beforeEach(() => {
        BookImportService.import.mockClear();
        BookCoverService.cover.mockClear();
        PdfReaderService.read.mockClear();
        BookVectorStoreService.store.mockClear();
    });

    test('Shoud call Book Import Service, Book Cover Service & Pdf Reader Service', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();

        await BookImportController.import(req, res);
        expect(BookImportService.import).toBeCalled();
        expect(BookCoverService.cover).toBeCalled();
        expect(PdfReaderService.read).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();

        await BookImportController.import(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();

        await BookImportController.import(req, res);
        expect(res.json).toBeCalledWith({ isbn: '', title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();
        BookImportService.import.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        
        await BookImportController.import(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});