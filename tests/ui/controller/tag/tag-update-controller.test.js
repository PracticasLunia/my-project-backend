import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import TagUpdateService from '../../../../src/services/tag/tag-update-service.js';
import TagUpdateController from '../../../../src/ui/controllers/tag/tag-update-controller.js'

describe('Tests for Tag Update Controller', () => {
    beforeAll(() => {
        TagUpdateService.update = jest.fn(TagUpdateService.update);
    });

    beforeEach(() => {
        TagUpdateService.update.mockClear();
    });

    test('Shoud call Tag Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await TagUpdateController.update(req, res);
        expect(TagUpdateService.update).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        TagUpdateService.update.mockImplementation(() => {
            return [1];
        });

        await TagUpdateController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagUpdateService.update.mockResolvedValue([1]);
        await TagUpdateController.update(req, res);

        expect(res.json).toBeCalledWith([1]);
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagUpdateService.update.mockImplementation(() => {
            const error = new Error("Error message");
            error.status = 400;
            throw error;
        });
        await TagUpdateController.update(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});