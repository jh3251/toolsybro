'use server';
/**
 * @fileOverview A real-time word meaning analysis AI agent.
 *
 * - analyzeWordMeaning - A function that analyzes the meaning and feeling of words in real-time.
 * - AnalyzeWordMeaningInput - The input type for the analyzeWordMeaning function.
 * - AnalyzeWordMeaningOutput - The return type for the analyzeWordMeaning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeWordMeaningInputSchema = z.object({
  text: z.string().describe('The text to analyze.'),
});
export type AnalyzeWordMeaningInput = z.infer<typeof AnalyzeWordMeaningInputSchema>;

const AnalyzeWordMeaningOutputSchema = z.object({
  meaning: z.string().describe('The meaning of the text.'),
  feeling: z.string().describe('The feeling or sentiment expressed in the text.'),
});
export type AnalyzeWordMeaningOutput = z.infer<typeof AnalyzeWordMeaningOutputSchema>;

export async function analyzeWordMeaning(input: AnalyzeWordMeaningInput): Promise<AnalyzeWordMeaningOutput> {
  return analyzeWordMeaningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeWordMeaningPrompt',
  input: {schema: AnalyzeWordMeaningInputSchema},
  output: {schema: AnalyzeWordMeaningOutputSchema},
  prompt: `You are an AI expert in semantic analysis. Your task is to analyze the given text and determine its meaning and the feeling or sentiment it expresses.\n\nText: {{{text}}}\n\nMeaning: Provide a concise explanation of the text's meaning.\nFeeling: Describe the overall feeling or sentiment conveyed by the text (e.g., positive, negative, neutral, excited, sad).`,
});

const analyzeWordMeaningFlow = ai.defineFlow(
  {
    name: 'analyzeWordMeaningFlow',
    inputSchema: AnalyzeWordMeaningInputSchema,
    outputSchema: AnalyzeWordMeaningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
