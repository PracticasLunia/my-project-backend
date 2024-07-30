import { ChatPromptTemplate } from "@langchain/core/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TokenTextSplitter } from "@langchain/textsplitters";
import { PromptTemplate } from "@langchain/core/prompts";
//import { DallEAPIWrapper } from "@langchain/openai";
import BookRepository from "../../repositories/book-repository.js";
import bookSchema from  '../../schemas/book.js'
import llm from "../../utils/llm.js";
//import './test.js'

export default class BookImportService {
    static async import(file){
        try {
            /* GET USED ISBN */
            const books = await BookRepository.findAll()
            let isbns = ''
            for (let book of books){
                isbns += book.isbn + ", "
            }
            /* READ FILE & GENERATE FIELDS */
            const blob = await new Blob([file.data], { type: file.mimetype });
            const loader = await new PDFLoader(blob, {
                splitPages: false
            })
            const docs = await loader.load();
            const SYSTEM_PROMPT_TEMPLATE = `You are an expert extraction algorithm. 
            Only extract relevant information from the text. 
            Have to extract the attributes below:
            --------
            title
            author
            isbn
            genre
            publicationDate 
            publisher 
            language
            description
            summary 
            pageCount 
            coverImage 
            format 
            availability 
            category: null
            Tags: []
            averageRating
            ratingCount
            --------
            For publicationDate attribute, use format yyyy-MM-dd (Dont leave any date attribute with '', use today date).
            For isbn attribute, use the real value or random number (Never use '' or one already used. Used: [${isbns}]).
            Don't forget about any attribute.`;
    
            const prompt = ChatPromptTemplate.fromMessages([
                ["system", SYSTEM_PROMPT_TEMPLATE],
                ["human", "{text}"],
            ]);
            const extractionRunnable = prompt.pipe(
                llm.withStructuredOutput(bookSchema, { name: "book" })
            );
            
            const result = await extractionRunnable.invoke({text: docs[0].pageContent});

            /*GENERATE SUMMARY*/
            const summaryTemplate = `
            You are an expert in summarizing books.
            Your goal is to create a summary of a book.
            Below you find the transcript of a book:
            --------
            {text}
            --------
            Total output will be a summary of the book.

            SUMMARY:
            `;

            const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);
            const summarizeChain = loadSummarizationChain(llm, {
                type: "stuff",
                questionPrompt: SUMMARY_PROMPT,
            });

            const splitter = new TokenTextSplitter({
                chunkSize: 10000,
                chunkOverlap: 250,
            });
            const docsSummary = await splitter.splitDocuments(docs);
            const summary = await summarizeChain.invoke(docsSummary);

            /* GENERATE COVER */
            const tool = new DallEAPIWrapper({
                n: 1, // Default
                model: "dall-e-3", // Default
                apiKey: process.env.OPENAI_API_KEY, // Default
            });
            
            const imageURL = await tool.invoke("a painting of a cat");
            
            console.log(imageURL);

            /* STORE IN DATABASE AND RETURN */
            result.summary = summary;
            if (result.publicationDate === ''){
                result.publicationDate = new Date();
            }
            const created = await BookRepository.create(result);
            if(!created || created[0] === 0){
                const error = new Error();
                error.status = 400;
                error.message = "Can't create the book data";
                throw error;
            }
            return created;
        } catch (err) {
            const error = new Error("Failed to import book: " + err.message);
            error.status = 400;
            throw error;
        }
        

        /*const tags = data['Tags'];
        delete data['Tags'];
        const created = await BookRepository.create(data);
        if(!created || created[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't create the book data";
            throw error;
        }
        for (const tag of tags){
            await BookTagRepository.create({ BookIsbn: created.dataValues.isbn, TagId: tag.id})
        }
        return created;*/
    }
}