import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import BookRepository from "../../repositories/book-repository.js";
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

export default class BookVectorSearchService {
    static async search(description){
        try {
            const embeddings = new AzureOpenAIEmbeddings({
                azureOpenAIApiKey: process.env['AZURE_OPENAI_API_KEY'] || 'TEST_API_KEY',
                azureOpenAIApiInstanceName: process.env['AZURE_OPENAI_API_INSTANCE_NAME'] || "",
                azureOpenAIApiVersion: process.env['AZURE_OPENAI_API_EMBEDDINGS_VERSION'] || "v-test",
                azureOpenAIApiEmbeddingsDeploymentName: process.env['AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME'] || "text-embedding-3-large",
                azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
            },{});
            
            const vectorStore = new Chroma(embeddings, {
                collectionName: "books-collection",
                url: process.env['CHROMADB_URL'],
            });
            await vectorStore.ensureCollection();

            const llm = new AzureChatOpenAI({
                azureOpenAIApiKey: process.env['AZURE_OPENAI_API_KEY'] || 'TEST_API_KEY',
                azureOpenAIApiInstanceName: process.env['AZURE_OPENAI_API_INSTANCE_NAME'] || "gpt-35-turbo",
                azureOpenAIApiVersion: process.env['AZURE_OPENAI_API_VERSION'] || "v-test",
                azureOpenAIApiDeploymentName: process.env['AZURE_OPENAI_API_DEPLOYMENT_NAME'] || "gpt-35-turbo",
                temperature: 0.7,
                azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
            });

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
            const error = new Error("Can't search books in the vector store:"+err.message)
            error.status = 500;
            throw error;
        }
    }
}