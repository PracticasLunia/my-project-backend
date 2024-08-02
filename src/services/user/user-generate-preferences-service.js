import { ChatPromptTemplate } from "@langchain/core/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import BookRepository from "../../repositories/book-repository.js";
import preferencesSchema from  '../../schemas/preferences.js'
import llm from "../../utils/llm.js";
import ISBN from "../../utils/isbn.js";

export default class UserGeneratePreferencesService {
    static async generate(text){
        try {
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
            const error = new Error("Failed to import book: " + err.message);
            error.status = 400;
            throw error;
        }
    }
}