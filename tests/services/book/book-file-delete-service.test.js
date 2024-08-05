import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookFileDeleteService from '../../../src/services/book/book-file-delete-service.js';
import fs from 'fs'

describe('Tests for Book File Delete Controller', () => {
    beforeAll(() => {
        fs.existsSync = jest.fn(() => {return true})
        fs.mkdirSync = jest.fn(() => {})
        fs.rmSync = jest.fn(() => {})
    });

    beforeEach(() => {
        fs.existsSync.mockClear();
        fs.mkdirSync.mockClear();
        fs.rmSync.mockClear();
    });

    test('Should use rmSync and check if exists directory', async () => {
        await BookFileDeleteService.delete('1');
        expect(fs.existsSync).toBeCalled();
        expect(fs.rmSync).toBeCalled();
    });

    test('Should create directory if not exists', async () => {
        fs.existsSync.mockImplementation(() => {
            return false;
        })
        await BookFileDeleteService.delete('1');
        expect(fs.existsSync).toBeCalled();
        expect(fs.mkdirSync).toBeCalled();
        expect(fs.rmSync).toBeCalled();
    });

    test('Should throw error if anythings fails', async () => {
        fs.rmSync.mockImplementation(() => {
            const error =  new Error()
            error.message = "ERROR"
            error.status = 500;
            throw error;
        })
        try {
            await BookFileDeleteService.delete('1');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Error while deleting file: "+ "ERROR");
        }
    });

    afterAll(() => {
        fs.existsSync.mockRestore();
        fs.mkdirSync.mockRestore();
        fs.rmSync.mockRestore();
    });
});