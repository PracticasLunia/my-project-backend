import BookRepository from "../../repositories/book-repository.js";
import { AzureOpenAI } from "openai";

export default class BookCoverService {
    static async cover(book){
        try {
            /* GENERATE COVER */
            const promptPaint = `A cover of the book with this data:
            --------
            ${book.summary ? book.summary : book.title}
            --------
            `;
            const size = "1024x1024";
            const n = 1;
            const apiKey = process.env['AZURE_OPENAI_API_KEY_2'] || 'YOUR_API_KEY';
            const deployment = "Dalle3";
            const apiVersion = process.env['DALL_E_3_VERSION'] || "2024-04-01-preview";
            const endpoint = process.env['AZURE_OPENAI_ENDPOINT'] || 'https://api.openai.azure.com';
            const client = new AzureOpenAI({ apiKey, deployment, apiVersion, endpoint });
            const images = await client.images.generate({ prompt: promptPaint, model: deployment, n, size });
            const cover = images.data[0].url

            /* STORE IN DATABASE AND RETURN */
            book.dataValues.coverImage = cover;
            const updated = await BookRepository.update(book.dataValues.isbn, { coverImage: cover });
            if(!updated){
                const error = new Error("Can't update the book cover");
                error.status = 500;
                throw error;
            }
            return book;
        }  catch (err) {
            const error = new Error("Failed to import book: " + err.message);
            error.status = 500;
            throw error;
        }
    }
}