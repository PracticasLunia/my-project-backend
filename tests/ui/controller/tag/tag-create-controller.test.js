import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import TagCreateService from '../../../../src/services/tag/tag-create-service.js';
import TagCreateController from '../../../../src/ui/controllers/tag/tag-create-controller.js'

describe('Tests for Tag Create Controller', () => {
    beforeAll(() => {
        TagCreateService.create = jest.fn(() => {});
    });

    beforeEach(() => {
        TagCreateService.create.mockClear();
    });

    test('Shoud work', async () => {;
        expect(true).toBeTruthy();
    });
    test('Shoud call Tag Find Service', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();

        await TagCreateController.create(req, res);
        expect(TagCreateService.create).toBeCalled();
    });

    test('Should return code 200 on response ', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        TagCreateService.create.mockImplementation(() => {
            return { title: '', author: ''};
        });

        await TagCreateController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return the return of the service on response', async () => {
        const req = mockRequest({ body: { title: '', author: ''}});
        const res = mockResponse();
        TagCreateService.create.mockResolvedValue({ title: '', author: ''});
        await TagCreateController.create(req, res);

        expect(res.json).toBeCalledWith({ title: '', author: ''});
    });

    test('Should return 400 error and a error message on response if service fails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        TagCreateService.create.mockImplementation(() => {
            const error = new Error("Error message");
            throw error;
        });
        await TagCreateController.create(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ error: "Error message" });
    });
});