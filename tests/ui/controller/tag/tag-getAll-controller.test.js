import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import TagGetAllService from '../../../../src/services/tag/tag-getAll-service.js';
import TagGetAllController from '../../../../src/ui/controllers/tag/tag-getAll-controller.js'

describe('Tests for Tag Find Controller', () => {
    beforeAll(() => {
        TagGetAllService.getAll = jest.fn(TagGetAllService.getAll);
    });

    beforeEach(() => {
        TagGetAllService.getAll.mockClear();
    });

    test('Shoud call Tag Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await TagGetAllController.getAll(req, res);
        expect(TagGetAllService.getAll).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        TagGetAllService.getAll.mockImplementation(() => {
            return {}
        });

        await TagGetAllController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return an empty list on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagGetAllService.getAll.mockResolvedValue([]);
        await TagGetAllController.getAll(req, res);

        expect(res.json).toBeCalledWith([]);
    });

    test('Should return 400 error and a error message on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagGetAllService.getAll.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await TagGetAllController.getAll(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});