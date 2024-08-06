import { describe, test, expect, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import BookFileSaveService from '../../../src/services/book/book-file-save-service.js';
import fs from 'fs'

let existsSync;
let mkdirSync;
let writeFileSync;

describe('Tests for Book File Save Controller', () => {
    beforeAll(() => {
        existsSync = fs.existsSync;
        mkdirSync = fs.mkdirSync;
        writeFileSync = fs.writeFileSync;
        fs.existsSync = jest.fn(() => {return true})
        fs.mkdirSync = jest.fn(() => {})
        fs.writeFileSync = jest.fn(() => {})
    });

    beforeEach(() => {
        fs.existsSync.mockClear();
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
    });

    test('Should use rmSync and check if exists directory', async () => {
        await BookFileSaveService.save('1', 'data');
        expect(fs.existsSync).toBeCalled();
        expect(fs.writeFileSync).toBeCalled();
    });

    test('Should create directory if not exists', async () => {
        fs.existsSync.mockImplementation(() => {
            return false;
        })
        await BookFileSaveService.save('1', 'data');
        expect(fs.existsSync).toBeCalled();
        expect(fs.mkdirSync).toBeCalled();
        expect(fs.writeFileSync).toBeCalled();
    });

    test('Should throw error if anythings fails', async () => {
        fs.writeFileSync.mockImplementation(() => {
            const error =  new Error()
            error.message = "ERROR"
            error.status = 500;
            throw error;
        })
        try {
            await BookFileSaveService.save('1', 'data');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Error while saving file: "+ "ERROR");
        }
    });

    afterAll(() => {
        fs.existsSync = existsSync;
        fs.mkdirSync = mkdirSync;
        fs.writeFileSync = writeFileSync;
    });
});