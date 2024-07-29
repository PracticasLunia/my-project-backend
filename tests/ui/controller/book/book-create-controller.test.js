import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import BookCreateService from '../../../../src/services/book/book-create-service.js';
import BookCreateController from '../../../../src/ui/controllers/book/book-create-controller.js'

describe('Tests for Book Create Controller', () => {
    beforeAll(() => {
        BookCreateService.create = jest.fn(() => {});
    });

    beforeEach(() => {
        BookCreateService.create.mockClear();
    });

    test('Shoud work', async () => {;
        expect(true).toBeTruthy();
    });
    test('Shoud call Book Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await BookCreateController.create(req, res);
        expect(BookCreateService.create).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        BookCreateService.create.mockImplementation(() => {
            return { title: '', author: ''};
        });

        await BookCreateController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        BookCreateService.create.mockResolvedValue({ title: '', author: ''});
        await BookCreateController.create(req, res);

        expect(res.json).toBeCalledWith({ title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
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