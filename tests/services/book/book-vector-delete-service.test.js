import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BookVectorDeleteService from '../../../src/services/book/book-vector-delete-service.js'
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { AzureOpenAIEmbeddings } from '@langchain/openai';

describe('Tests for Book Vector Delete Service', () => {
    beforeAll(() => {
        Chroma.prototype.delete = jest.fn().mockReturnValue({});
        Chroma.prototype.ensureCollection = jest.fn();
    });

    beforeEach(() => {
        Chroma.prototype.delete.mockClear();
        Chroma.prototype.ensureCollection.mockClear();
    });

    test('Should use Chroma && AzureOpenAIEmbeddings', async () => {
        await BookVectorDeleteService.delete({ dataValues: {isbn: '1'} });

        expect(Chroma.prototype.delete).toBeCalled();
    });

    test('Should throw error if store fails', async () => {
        Chroma.prototype.delete = jest.fn().mockImplementation(() => {throw new Error()});
        
        try {
            await BookVectorDeleteService.delete({ dataValues: {isbn: '1'} });
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Can't delete the book from the vector store");
        }
    });
});
