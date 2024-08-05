import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import PdfReaderService from '../../src/services/pdf-reader-service.js';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { TokenTextSplitter } from '@langchain/textsplitters';


describe('Tests for Pdf Reader Service', () => {
    beforeAll(() => {
        PDFLoader.prototype.load = jest.fn();
        TokenTextSplitter.prototype.splitDocuments = jest.fn().mockResolvedValue(['chunk1', 'chunk2']);
    });

    beforeEach(() => {
        PDFLoader.prototype.load.mockClear();
        TokenTextSplitter.prototype.splitDocuments.mockClear();
    });
    
    test('Should use PDFLoader && TokenTextSplitter and return the splitter return', async () => {
        const uploadedFile = {
            name: "sample.pdf",
            mv: jest.fn().mockImplementation((path, callback) => {
                callback(null);
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
        expect(PDFLoader.prototype.load).toBeCalled();
        expect(TokenTextSplitter.prototype.splitDocuments).toBeCalled();
        expect(result).toEqual(['chunk1', 'chunk2']);
    });

    test('Should throw error if PDFLoader not returns the pdf', async () => {
        PDFLoader.prototype.load = jest.fn().mockImplementation(() => {
            const err = new Error("Failed reading pdf");
            throw err;
        });
        try {
            await PdfReaderService.read({ data: "test", mimetype: "test" });
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe("Failed reading pdf");
        }
    });
});
