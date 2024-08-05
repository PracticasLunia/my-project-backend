import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BookRepository from "../../../src/repositories/book-repository.js";
import BookImportService from '../../../src/services/book/book-import-service.js';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { AzureChatOpenAI } from '@langchain/openai';
import { StuffDocumentsChain } from "langchain/chains";

describe('Tests for Book Import Service', () => {
    const RunMock = jest.fn().mockReturnValue('test');
    beforeAll(() => {
        BookRepository.create = jest.fn().mockReturnValue({isbn: '1'});
        BookRepository.findAll = jest.fn().mockReturnValue([{isbn: '3'}]);
        AzureChatOpenAI.prototype.withStructuredOutput = jest.fn().mockReturnValue({});
        ChatPromptTemplate.fromMessages = jest.fn().mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                invoke: jest.fn().mockReturnValue({ isbn: '1', publicationDate: '2022-01-01' })
            })
        });
        PromptTemplate.fromTemplate = jest.fn();
        StuffDocumentsChain.prototype.run = RunMock;
    });

    beforeEach(() => {
        BookRepository.create.mockClear();
        BookRepository.findAll.mockClear();
        AzureChatOpenAI.prototype.withStructuredOutput.mockClear();
        ChatPromptTemplate.fromMessages.mockClear();
        PromptTemplate.fromTemplate.mockClear();
        RunMock.mockClear();
    });

    test('Should use AzureChat and invoke it to generate good results', async () => {
        await BookImportService.import([{pageContent: 'test', metadata: {}}, {pageContent: 'test', metadata: {}}]);
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledTimes(2);
        expect(RunMock).toHaveBeenCalled();
        expect(BookRepository.create).toHaveBeenCalled();
    });

    test('Should use AzureChat and invoke it to generate bad results & correct them', async () => {
        ChatPromptTemplate.fromMessages = jest.fn().mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                invoke: jest.fn().mockReturnValue({ isbn: '', publicationDate: '' })
            })
        });
        await BookImportService.import([{pageContent: 'test', metadata: {}}, {pageContent: 'test', metadata: {}}]);
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledTimes(2);
        expect(RunMock).toHaveBeenCalled();
        expect(BookRepository.create).toHaveBeenCalled();;
    });

    test('Should throw error if something goes bad', async () => {
        BookRepository.create = jest.fn().mockImplementation(() => {throw new Error('ERROR')});

        try {
            await BookImportService.import([{pageContent: 'test', metadata: {}}, {pageContent: 'test', metadata: {}}]);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Failed to create the book: " + "ERROR");
        }
    });

    test('Should throw error if creation fails', async () => {
        BookRepository.create = jest.fn().mockImplementation(() => {return false});
        
        try {
            await BookImportService.import([{pageContent: 'test', metadata: {}}, {pageContent: 'test', metadata: {}}]);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.status).toBe(500);
            expect(err.message).toBe("Failed to create the book: " + "Can't create the book data");
        }
    });
});
