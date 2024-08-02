import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import PdfReaderService from '../../src/services/pdf-reader-service.js';

jest.unstable_mockModule('@langchain/community/document_loaders/fs/pdf', () => ({
    PDFLoader: jest.fn().mockImplementation(() => ({
        load: jest.fn().mockResolvedValue([{ pageContent: "This is a sample text." }]) // Devuelve un array con un objeto que contiene texto
    }))
}));

jest.unstable_mockModule('node:buffer', () => ({
    Blob: jest.fn().mockImplementation((data, options) => ({})) // Devuelve un objeto vacío
}));

jest.unstable_mockModule('@langchain/textsplitters', () => ({
    TokenTextSplitter: jest.fn().mockImplementation(() => ({
        splitDocuments: jest.fn().mockResolvedValue(['chunk1', 'chunk2']) // Devuelve un array de chunks
    }))
}));

const { PDFLoader } = await import('@langchain/community/document_loaders/fs/pdf');
const { TokenTextSplitter } = await import('@langchain/textsplitters');
const { Blob } = await import('node:buffer');

describe('Tests for Pdf Reader Service', () => {
    beforeEach(() => {
        PDFLoader.mockClear();
        TokenTextSplitter.mockClear();
        Blob.mockClear();
    });

    test('Should use PDFLoader && TokenTextSplitter and return the splitter return', async () => {
        const uploadedFile = {
            name: "sample.pdf",
            mv: jest.fn().mockImplementation((path, callback) => {
                callback(null); // Simula una llamada exitosa
            }),
            encoding: "7bit",
            mimetype: "application/pdf",
            data: Buffer.from("JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDMgMCBSL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDEgMCBS", 'base64'),
            tempFilePath: "/tmp/sample.pdf",
            truncated: false,
            size: 123456,
            md5: "d41d8cd98f00b204e9800998ecf8427e"
        };

        const result = await PdfReaderService.read(uploadedFile);
        expect(PDFLoader).toBeCalled();
        expect(TokenTextSplitter).toBeCalled();
        expect(result).toEqual(['chunk1', 'chunk2']);
    });

    test('Should throw error if PDFLoader not returns the pdf', async () => {
        PDFLoader.mockImplementation(() => ({
            load: jest.fn().mockImplementation(() => {
                const err = new Error("Failed reading pdf");
                throw err;
            })
        }));
        
        try {
            await PdfReaderService.read({ data: "test", mimetype: "test" });
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Failed reading pdf");
        }
    });
});
