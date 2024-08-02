import { AzureChatOpenAI } from "@langchain/openai";

let llm = null

if(process.env.NODE_ENV !== 'test'){

llm = new AzureChatOpenAI({
    temperature: 0.7,
    azureOpenAIBasePath: "https://gpt-usa-02.openai.azure.com/openai/deployments",
});

}

export default llm;