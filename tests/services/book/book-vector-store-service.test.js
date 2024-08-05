import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BookVectorStoreService from '../../../src/services/book/book-vector-store-service.js'
import { Chroma } from '@langchain/community/vectorstores/chroma';

describe('Tests for Book Vector Store Service', () => {
    beforeAll(() => {
        Chroma.prototype.addDocuments = jest.fn().mockReturnValue({});
        Chroma.prototype.ensureCollection = jest.fn();
    });

    beforeEach(() => {
        Chroma.prototype.addDocuments.mockClear();
        Chroma.prototype.ensureCollection.mockClear();
    });

    test('Should use Chroma && AzureOpenAIEmbeddings', async () => {
        await BookVectorStoreService.store({ dataValues: {isbn: '1'} },[{}, {}]);

        expect(Chroma.prototype.addDocuments).toBeCalled();
    });

    test('Should throw error if store fails', async () => {
        Chroma.prototype.addDocuments = jest.fn().mockImplementation(() => {throw new Error()});
        
        try {
            await BookVectorStoreService.store({ dataValues: {isbn: '1'} },[{}, {}]);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Can't store the book in the vector store");
        }
    });
});
