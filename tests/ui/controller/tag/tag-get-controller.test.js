import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import TagGetService from '../../../../src/services/tag/tag-get-service.js';
import TagGetController from '../../../../src/ui/controllers/tag/tag-get-controller.js'

describe('Tests for Tag Get Controller', () => {
    beforeAll(() => {
        TagGetService.get = jest.fn(TagGetService.get);
    });

    beforeEach(() => {
        TagGetService.get.mockClear();
    });

    test('Shoud call Tag Get Service', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();

        await TagGetController.get(req, res);
        expect(TagGetService.get).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { isbn: ''}});
        const res = mockResponse();
        TagGetService.get.mockImplementation(() => {
            return [1];
        });

        await TagGetController.get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagGetService.get.mockResolvedValue([1]);
        await TagGetController.get(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagGetService.get.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await TagGetController.get(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});