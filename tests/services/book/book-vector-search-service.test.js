import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BookVectorSearchService from '../../../src/services/book/book-vector-search-service.js';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import BookRepository from "../../../src/repositories/book-repository.js";

describe('Tests for Book Vector Search Service', () => {
    beforeAll(() => {
        Chroma.prototype.asRetriever = jest.fn().mockReturnValue({});
        Chroma.prototype.ensureCollection = jest.fn();
        MultiQueryRetriever.fromLLM = jest.fn(() => {return MultiQueryRetriever.prototype});
        MultiQueryRetriever.prototype.invoke = jest.fn().mockReturnValue([{metadata: {isbn: '1'}}, {metadata: {isbn: '2'}}, {metadata: {isbn: '1'}}]);
        BookRepository.get = jest.fn().mockReturnValue({isbn: '1'});
    });

    beforeEach(() => {
        Chroma.prototype.asRetriever.mockClear();
        Chroma.prototype.ensureCollection.mockClear();
        MultiQueryRetriever.fromLLM.mockClear();
        MultiQueryRetriever.prototype.invoke.mockClear();
        BookRepository.get.mockClear();
    });

    test('Should use MultiQueryRetriever and invoke it', async () => {
        await BookVectorSearchService.search('');

        expect(Chroma.prototype.asRetriever).toBeCalled();
        expect(MultiQueryRetriever.fromLLM).toBeCalled();
        expect(MultiQueryRetriever.prototype.invoke).toBeCalled();
    });

    test('Should throw error if store fails', async () => {
        BookRepository.get = jest.fn().mockImplementation(() => {throw new Error()});
        
        try {
            await BookVectorSearchService.search('test');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
        }
    });
});
