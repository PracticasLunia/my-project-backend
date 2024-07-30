import { AzureChatOpenAI } from "@langchain/openai";

const llm = new AzureChatOpenAI({
    temperature: 0.7,
    azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
});

export default llm;