import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookImportService from '../../../../src/services/book/book-import-service.js';
import BookImportController from '../../../../src/ui/controllers/book/book-import-controller.js'

describe('Tests for Book Import Controller', () => {
    beforeAll(() => {
        BookImportService.import = jest.fn(BookImportService.import);
    });

    beforeEach(() => {
        BookImportService.import.mockClear();
    });

    test('Shoud call Book Import Service', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();

        await BookImportController.import(req, res);
        expect(BookImportService.import).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();
        BookImportService.import.mockImplementation(() => {
            return [1];
        });

        await BookImportController.import(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ files: { file: ''}});
        const res = mockResponse();
        BookImportService.import.mockResolvedValue([1]);
        await BookImportController.import(req, res);

        expect(res.json).toBeCalledWith([1]);
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