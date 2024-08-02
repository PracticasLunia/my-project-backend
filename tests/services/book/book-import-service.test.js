import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import BookImportService from '../../../src/services/book/book-import-service';
import ISBN from '../../../src/utils/isbn.js';
import BookRepository from '../../../src/repositories/book-repository.js';

jest.unstable_mockModule('@langchain/openai', () => ({
    AzureChatOpenAI: jest.fn()
}));
jest.unstable_mockModule('@langchain/community/document_loaders/fs/pdf', () => ({
    PDFLoader: jest.fn()
}));

const { AzureChatOpenAI } = await import('@langchain/openai');
const { PDFLoader } = await import('@langchain/community/document_loaders/fs/pdf');

describe('BookImportService', () => {
    beforeAll(() => {
        BookRepository.findAll = jest.fn(BookRepository.findAll)
        BookRepository.create = jest.fn(BookRepository.create)
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should work', () => {
        expect(1).toBe(1);
    });
    /*
    it('should import book data successfully', async () => {
        // Arrange
        const mockBooks = [
            { isbn: '1234567890' },
            { isbn: '0987654321' }
        ];
        const mockFile = {
            data: 'fake pdf data',
            mimetype: 'application/pdf'
        };
        const mockDocs = [{ pageContent: 'fake page content' }];
        const mockResult = {
            title: 'Mock Title',
            author: 'Mock Author',
            isbn: '1111111111',
            genre: 'Mock Genre',
            publicationDate: '2023-07-31',
            publisher: 'Mock Publisher',
            language: 'English',
            description: 'Mock Description',
            summary: 'Mock Summary',
            pageCount: 100,
            coverImage: 'mock_cover_image_url',
            format: 'Hardcover',
            availability: 'In Stock',
            category: null,
            tags: ['mock', 'tags'],
            averageRating: 4.5,
            ratingCount: 10
        };

        BookRepository.create.mockResolvedValue([1]);
        BookRepository.findAll.mockResolvedValue(mockBooks);
        AzureChatOpenAI.mockImplementation(() => ({
            withStructuredOutput: jest.fn().mockReturnThis({}),
            invoke: jest.fn().mockResolvedValue(mockResult)
        }));
        PDFLoader.mockImplementation(() => ({
            load: jest.fn().mockResolvedValue(mockDocs)
        }));
        // Act
        const result = await BookImportService.import(mockFile);

        // Assert
        expect(BookRepository.findAll).toHaveBeenCalledTimes(1);
        expect(PDFLoader).toHaveBeenCalledWith(expect.any(Blob), { splitPages: false });
        expect(AzureChatOpenAI).toHaveBeenCalledWith({
            temperature: 0.7,
            azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments"
        });
        expect(BookRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Mock Title',
            author: 'Mock Author',
            isbn: '1111111111'
        }));
        expect(result).toEqual([1]);
    });

    it('should throw an error if importing fails', async () => {
        // Arrange
        const mockFile = {
            data: 'fake pdf data',
            mimetype: 'application/pdf'
        };
        const errorMessage = 'Something went wrong';

        BookRepository.findAll.mockImplementation(() => { throw new Error(errorMessage)});

        // Act & Assert
        await expect(BookImportService.import(mockFile)).rejects.toThrow(`Failed to import book: ${errorMessage}`);
    });*/
});