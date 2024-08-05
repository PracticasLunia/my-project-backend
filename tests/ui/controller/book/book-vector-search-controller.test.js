import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookVectorSearchController from '../../../../src/ui/controllers/book/book-vector-search-controller.js';
import BookVectorSearchService from '../../../../src/services/book/book-vector-search-service.js';

describe('Tests for Book Vector Search Controller', () => {
    beforeAll(() => {
        BookVectorSearchService.search = jest.fn(() => { return { isbn: '', title: '', author: ''}});
    });

    beforeEach(() => {
        BookVectorSearchService.search.mockClear();
    });

    test('Shoud call Book Vector Search Service', async () => {
        const req = mockRequest({ body: { description: ''}});
        const res = mockResponse();

        await BookVectorSearchController.search(req, res);
        expect(BookVectorSearchService.search).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { description: ''}});
        const res = mockResponse();

        await BookVectorSearchController.search(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { description: ''}});
        const res = mockResponse();

        await BookVectorSearchController.search(req, res);
        expect(res.json).toBeCalledWith({ isbn: '', title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest({ body: { description: ''}});
        const res = mockResponse();
        BookVectorSearchService.search.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        
        await BookVectorSearchController.search(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});