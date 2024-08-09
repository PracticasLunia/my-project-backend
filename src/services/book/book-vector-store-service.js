import { Chroma } from "@langchain/community/vectorstores/chroma";
import { AzureOpenAIEmbeddings } from "@langchain/openai";

export default class BookVectorStoreService {
    static async store(book, docs){
        try {
            const embeddings = new AzureOpenAIEmbeddings({
                azureOpenAIApiKey: process.env['AZURE_OPENAI_API_KEY'] || 'TEST_API_KEY',
                azureOpenAIApiInstanceName: process.env['AZURE_OPENAI_API_INSTANCE_NAME'] || "",
                azureOpenAIApiVersion: process.env['AZURE_OPENAI_API_VERSION'] || "v-test",
                azureOpenAIApiEmbeddingsDeploymentName: process.env['AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME'] || "text-embedding-3-large",
                azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
            },{});
            
            const vectorStore = new Chroma(embeddings, {
                collectionName: "books-collection",
                url: process.env['CHROMADB_URL'],
            });
            await vectorStore.ensureCollection();

            for (let doc of docs){
                doc.metadata = book.dataValues;
            }
            await vectorStore.addDocuments(docs);
        } catch (err){
            const error = new Error("Can't store the book in the vector store")
            error.status = 500;
            throw error;
        }
    }
}