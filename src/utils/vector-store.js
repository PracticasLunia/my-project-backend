const { Chroma } = await import('@langchain/community/vectorstores/chroma');
const { AzureOpenAIEmbeddings } = await import('@langchain/openai');
import 'dotenv/config'

const embeddings = new AzureOpenAIEmbeddings({
    azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
},{});

const vectorStore = new Chroma(embeddings, {
    collectionName: "books-collection",
});

export default vectorStore;