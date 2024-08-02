import { ChatPromptTemplate } from "@langchain/core/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import BookRepository from "../../repositories/book-repository.js";
import bookSchema from  '../../schemas/book.js'
import llm from "../../utils/llm.js";
import ISBN from "../../utils/isbn.js";

export default class BookImportService {
    static async import(docs){
        try {
            /* GET USED ISBN */
            const books = await BookRepository.findAll()
            let isbns = ''
            for (let book of books){
                isbns += book.isbn + ", "
            }

            /* READ FILE & GENERATE FIELDS */
            let result = ""
            for (const doc of docs){
                const SYSTEM_PROMPT_TEMPLATE = `You are an expert extraction algorithm. 
                You are reading a book page, and the result of reading the pages before is below. 
                Have to update the current attributes with only new relevant information
                
                ATTRIBUTES TO SEARCH:
                --------
                title
                author
                isbn: not use ['', ${isbns}]
                genre
                publicationDate: yyyy-MM-dd
                publisher 
                language
                description
                summary 
                pageCount 
                coverImage 
                format 
                availability 
                category: null
                Tags: [] add always something
                averageRating
                ratingCount
                --------

                CURRENT ATTRIBUTES FINDED:
                --------
                {result}
                --------
                For publicationDate attribute, use format yyyy-MM-dd (Dont leave any date attribute with '', use today date).
                For isbn attribute, use the real value or random number (Never use '' (empty string) or one already used. Used: [${isbns}]).
                For unknown attributes, use '*'
                Don't forget about any attribute.
                
                `;
        
                const prompt = ChatPromptTemplate.fromMessages([
                    ["system", SYSTEM_PROMPT_TEMPLATE],
                    ["human", "{text}"],
                ]);
                const extractionRunnable = prompt.pipe(
                    llm.withStructuredOutput(bookSchema, { name: "book" })
                );
                
                result = await extractionRunnable.invoke({text: doc.pageContent, result: JSON.stringify(result)});
            }

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

            const summary = await summarizeChain.run(docs);

            /* STORE IN DATABASE AND RETURN */
            result.summary = summary;
            if (result.publicationDate === ''){
                result.publicationDate = new Date();
            }
            if (result.isbn === ''){
                result.isbn = ISBN.makeISBN();
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
    }
}