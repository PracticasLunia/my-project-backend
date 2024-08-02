import vectorStore from "../../utils/vector-store.js";
import llm from "../../utils/llm.js";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { ChromaTranslator } from "@langchain/community/structured_query/chroma";
import BookRepository from "../../repositories/book-repository.js";

export default class BookVectorSearchService {
    static async search(description){
        try {
            if (description === ''){
                description = "I want to know about everything"
            }

            const multyQueryRetriever = await MultiQueryRetriever.fromLLM({
                llm: llm,
                queryCount: 5,
                retriever: vectorStore.asRetriever(),
                searchType: "similarity",
            });
            const docs = await multyQueryRetriever.invoke(description);

            let books = [];
            for (const doc of docs){
                let push = true;
                for (const meta of books){
                    if (meta.isbn === doc.metadata.isbn){
                        push = false;
                    };
                }
                if (push){
                    const book = await BookRepository.get(doc.metadata.isbn)
                    books.push(book);
                }
            }
            
            return books;
        } catch (err){
            const error = new Error("Can't search the book in the vector store")
            error.status = 400;
            throw error;
        }
    }
}