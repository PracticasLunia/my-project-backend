import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BookVectorDeleteService from '../../../src/services/book/book-vector-delete-service.js'

jest.unstable_mockModule('@langchain/community/vectorstores/chroma', () => ({
    Chroma: jest.fn().mockImplementation(() => ({
        delete: jest.fn().mockImplementation(() => {return void 1}), // Devuelve un array con un objeto que contiene texto
        ensureCollection: jest.fn().mockImplementation(() => {}) // Devuelve un array con un objeto que contiene texto
    }))
}));
jest.unstable_mockModule('@langchain/openai', () => ({
    AzureOpenAIEmbeddings: jest.fn().mockImplementation((data) => ({})) // Devuelve un objeto vacío
}));

const { Chroma } = await import('@langchain/community/vectorstores/chroma');
const { AzureOpenAIEmbeddings } = await import('@langchain/openai');

describe('Tests for Pdf Reader Service', () => {
    beforeEach(() => {
        Chroma.mockClear();
        AzureOpenAIEmbeddings.mockClear();
    });

    test('Should use Chroma && AzureOpenAIEmbeddings', async () => {
        const chroma = new Chroma();
    });

    test('Should use Chroma && AzureOpenAIEmbeddings', async () => {
        await BookVectorDeleteService.delete({ dataValues: {isbn: '1'} });

        expect(Chroma).toBeCalled();
        expect(AzureOpenAIEmbeddings).toBeCalled();
    });

    test('Should throw error if store fails', async () => {
        Chroma.mockImplementation(() => ({
            delete: jest.fn().mockImplementation(() => {
                const err = new Error("Failed reading pdf");
                throw err;
            })
        }));
        
        try {
            await BookVectorDeleteService.delete({ dataValues: {isbn: '1'} });
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Can't delete the book from the vector store");
        }
    });
});
