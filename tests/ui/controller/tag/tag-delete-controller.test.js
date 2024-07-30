import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import TagDeleteService from '../../../../src/services/tag/tag-delete-service.js';
import TagDeleteController from '../../../../src/ui/controllers/tag/tag-delete-controller.js'

describe('Tests for Tag Delete Controller', () => {
    beforeAll(() => {
        TagDeleteService.delete = jest.fn(TagDeleteService.delete);
    });

    beforeEach(() => {
        TagDeleteService.delete.mockClear();
    });

    test('Shoud call Tag Delete Service', async () => {
        const req = mockRequest({ body: { id: 1 }});
        const res = mockResponse();

        await TagDeleteController.delete(req, res);
        expect(TagDeleteService.delete).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { id: 1 }});
        const res = mockResponse();
        TagDeleteService.delete.mockImplementation(() => {
            return [1];
        });

        await TagDeleteController.delete(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagDeleteService.delete.mockResolvedValue([1]);
        await TagDeleteController.delete(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagDeleteService.delete.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await TagDeleteController.delete(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});