import { describe, test, expect, jest, beforeEach, beforeAll } from '@jest/globals';
import UserGeneratePreferencesService from '../../../src/services/user/user-generate-preferences-service.js';
import { AzureChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

describe('Tests for User Generate Preferences Service', () => {
    beforeAll(() => {
        AzureChatOpenAI.prototype.withStructuredOutput = jest.fn().mockReturnValue({});
        ChatPromptTemplate.fromMessages = jest.fn().mockReturnValue({pipe: jest.fn().mockReturnValue({invoke: jest.fn().mockReturnValue({preferences: 'test'})})});
    });

    beforeEach(() => {
        AzureChatOpenAI.prototype.withStructuredOutput.mockClear();
        ChatPromptTemplate.fromMessages.mockClear();
    });

    test('Should use AzureChatOpenAI and invoke the prompt', async () => {
        await UserGeneratePreferencesService.generate('test');

        expect(AzureChatOpenAI.prototype.withStructuredOutput).toHaveBeenCalledTimes(1);
        expect(ChatPromptTemplate.fromMessages).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if someting failed during the process', async () => {
        try {
            AzureChatOpenAI.prototype.withStructuredOutput = jest.fn().mockImplementation(() => {throw new Error("TEST")});

            await UserGeneratePreferencesService.generate('test');
            expect(true).toBe(false);
        }catch (err) {
            expect(err.message).toBe("Failed to generate preferences: "+"TEST");
        }
    });
});