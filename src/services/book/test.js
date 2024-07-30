import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
            
// The prompt to generate images from
const prompt = "a monkey eating a banana";
const size = "1024x1024";
            
// The number of images to generate
const n = 1;
            
export async function main() {
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
    const deployment = "dall-e-3";
    const apiVersion = "2024-04-01-preview";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
    const results = await client.images.generate({ prompt, model: "", n, size });
            
    for (const image of results.data) {
    console.log("Image generation result URL: 'image.url' ");
    }
}
            
main().catch((err) => {
    console.error("The sample encountered an error:", err);
});