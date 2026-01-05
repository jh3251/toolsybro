
'use server';
/**
 * @fileOverview An AI flow for checking text originality.
 *
 * - checkPlagiarism - A function that analyzes text and returns an originality score.
 * - PlagiarismInput - The input type for the checkPlagiarism function.
 * - PlagiarismResult - The return type for the checkPlagiarism function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlagiarismInputSchema = z.object({
  text: z.string().describe('The text content to be checked for plagiarism.'),
});
export type PlagiarismInput = z.infer<typeof PlagiarismInputSchema>;

const PlagiarismResultSchema = z.object({
  originalityScore: z.number().int().min(0).max(100).describe('An integer score from 0 to 100 representing the percentage of original content.'),
  summary: z.string().describe('A brief, one or two-sentence summary of the plagiarism analysis.'),
  plagiarizedSentences: z.array(z.string()).describe('A list of sentences that are likely to be unoriginal or plagiarized.'),
});
export type PlagiarismResult = z.infer<typeof PlagiarismResultSchema>;

export async function checkPlagiarism(input: PlagiarismInput): Promise<PlagiarismResult> {
  return plagiarismCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plagiarismCheckPrompt',
  input: { schema: PlagiarismInputSchema },
  output: { schema: PlagiarismResultSchema },
  prompt: `You are an advanced AI plagiarism detector. Your task is to analyze the following text for originality.
  
Based on your knowledge of existing texts, websites, and documents, evaluate the provided text.

1.  Provide an 'originalityScore' as an integer percentage from 0 (completely plagiarized) to 100 (completely original).
2.  Provide a concise 'summary' of your findings.
3.  Identify and list any specific sentences that appear to be unoriginal in the 'plagiarizedSentences' array. If the text is original, return an empty array.

Analyze the following text:
---
{{{text}}}
---
`,
});

const plagiarismCheckFlow = ai.defineFlow(
  {
    name: 'plagiarismCheckFlow',
    inputSchema: PlagiarismInputSchema,
    outputSchema: PlagiarismResultSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
