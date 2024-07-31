import { AzureChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TokenTextSplitter } from "@langchain/textsplitters";
import { PromptTemplate } from "@langchain/core/prompts";
import BookRepository from "../../repositories/book-repository.js";
import bookSchema from  '../../schemas/book.js'
import ISBN from "../../utils/isbn.js";
import { AzureOpenAI } from "openai";
import Book from "../../models/mysql/book.js";

export default class BookCoverService {
    static async cover(book){
        try {
            /* GENERATE COVER */
            const promptPaint = `A cover of the book with this data:
            --------
            ${book.summary.lenght > 0 ? book.summary : book.title}
            --------
            `;
            const size = "1024x1024";
            const n = 1;
            const apiKey = process.env['AZURE_OPENAI_API_KEY_2'];
            const deployment = "Dalle3";
            const apiVersion = "2024-04-01-preview";
            const endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
            const client = new AzureOpenAI({ apiKey, deployment, apiVersion, endpoint });
            const images = await client.images.generate({ prompt: promptPaint, model: deployment, n, size });
            const cover = images.data[0].url

            /* STORE IN DATABASE AND RETURN */
            book.dataValues.coverImage = cover;
            const updated = await BookRepository.update(book.dataValues.isbn, { coverImage: cover });
            if(!updated){
                const error = new Error();
                error.status = 400;
                error.message = "Can't update the book cover";
                throw error;
            }
            return book;
        } catch (err) {
            const error = new Error("Failed to import book: " + err.message);
            error.status = 400;
            throw error;
        }
    }
}