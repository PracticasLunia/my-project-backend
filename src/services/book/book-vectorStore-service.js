import { Chroma } from "@langchain/community/vectorstores/chroma";
import { AzureOpenAIEmbeddings } from "@langchain/openai";
import 'dotenv/config'

const embeddings = new AzureOpenAIEmbeddings({
    azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
},{});

const vectorStore = new Chroma(embeddings, {
    collectionName: "books-collection",
});
await vectorStore.ensureCollection();

export default class BookVectorStoreService {
    static async store(book, docs){
        /* STORE IN VECTOR STORE */
        try {
            docs[0].metadata = book.dataValues;
            docs[0].id = book.dataValues.isbn;
            await vectorStore.addDocuments(docs)
        } catch (err){
            const error = new Error("Can't store the book in the vector store")
            error.status = 500;
            throw error;
        }
    }

    static async updateMeta(book){
        try {
            vectorStore.de
        } catch (err){

        }
    }
}