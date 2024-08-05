import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import OpenAI, { AzureOpenAI } from 'openai';
import BookCoverService from '../../../src/services/book/book-cover-service.js';
import BookRepository from '../../../src/repositories/book-repository.js';
//import { APIPromise } from 'openai/src/core.js';

describe('Tests for Book Cover Service', () => {
    beforeAll(() => {
        OpenAI.prototype.post = jest.fn().mockImplementation(() => {return { data: [{ url: 'test' }] }});
        BookRepository.update = jest.fn().mockImplementation(() => {return [1];});
    });

    beforeEach(() => {
        OpenAI.prototype.post.mockClear();
        BookRepository.update.mockClear();
    });

    test('Should use AzureOpenAI to generate images with summary & Book Repository to update', async () => {
        await BookCoverService.cover({ summary: 'test', dataValues: {isbn: '1'} });
        expect(OpenAI.prototype.post).toBeCalled();
        expect(BookRepository.update).toBeCalled();
    });

    test('Should use AzureOpenAI to generate images with title but not updated correctly', async () => {
        BookRepository.update.mockImplementation(() => {return false;});

        try {
            await BookCoverService.cover({ summary: '', title: 'test', dataValues: {isbn: '1'} });
            expect(true).toBe(false);
        } catch (err) {
            expect(OpenAI.prototype.post).toBeCalled();
            expect(BookRepository.update).toBeCalled();
            expect(err.status).toBe(500);
            expect(err.message).toBe("Failed to import book: " +  "Can't update the book cover");
        }
    });

    test('Should throw error if store fails', async () => {
        OpenAI.prototype.post.mockImplementation(() => {
            throw new Error("CANT_GENERATE");
        });


        try {
            await BookCoverService.cover({ summary: 'test', dataValues: {isbn: '1'} });
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Failed to import book: " + "CANT_GENERATE");
        }
    });
});
