import { ChatPromptTemplate } from "@langchain/core/prompts";
import preferencesSchema from  '../../schemas/preferences.js'
import { AzureChatOpenAI } from "@langchain/openai";

export default class UserGeneratePreferencesService {
    static async generate(text){
        try {
            const llm = new AzureChatOpenAI({
                azureOpenAIApiKey: process.env['AZURE_OPENAI_API_KEY'] || 'TEST_API_KEY',
                azureOpenAIApiInstanceName: process.env['AZURE_OPENAI_MODEL'] || "gpt-35-turbo",
                azureOpenAIApiVersion: process.env['AZURE_OPENAI_API_VERSION'] || "v-test",
                azureOpenAIApiDeploymentName: process.env['AZURE_OPENAI_DEPLOYMENT_NAME'] || "gpt-35-turbo",
                temperature: 0.7,
                azureOpenAIBasePath: process.env['AZURE_BASE_PATH'] || "test"
            });

            const SYSTEM_PROMPT_TEMPLATE = `You are an expert extracting user preferences from descriptions. 
            You are reciving a description and you have to extract at least 10 items. 
            The output will be similar to this: 'Mountain, Bikes, Sunset, Animals, Football teams...'
            The output type have to be String
            `;
    
            const prompt = ChatPromptTemplate.fromMessages([
                ["system", SYSTEM_PROMPT_TEMPLATE],
                ["human", "{text}"],
            ]);
            const extractionRunnable = prompt.pipe(
                llm.withStructuredOutput(preferencesSchema, { name: "preferences" })
            );
            
            const result = await extractionRunnable.invoke({text: text});
            return result.preferences;
        } catch (err) {
            const error = new Error("Failed to generate preferences: " + err.message);
            error.status = 400;
            throw error;
        }
    }
}