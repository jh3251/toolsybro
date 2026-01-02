'use server';
/**
 * @fileOverview Summarizes contact form submissions for verification.
 *
 * - summarizeContactFormSubmission - A function that summarizes contact form submissions.
 * - SummarizeContactFormSubmissionInput - The input type for the summarizeContactFormSubmission function.
 * - SummarizeContactFormSubmissionOutput - The return type for the summarizeContactFormSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContactFormSubmissionInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The message content from the contact form.'),
});
export type SummarizeContactFormSubmissionInput = z.infer<typeof SummarizeContactFormSubmissionInputSchema>;

const SummarizeContactFormSubmissionOutputSchema = z.object({
  summary: z.string().describe('A short summary of the message content.'),
});
export type SummarizeContactFormSubmissionOutput = z.infer<typeof SummarizeContactFormSubmissionOutputSchema>;

export async function summarizeContactFormSubmission(input: SummarizeContactFormSubmissionInput): Promise<SummarizeContactFormSubmissionOutput> {
  return summarizeContactFormSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContactFormSubmissionPrompt',
  input: {schema: SummarizeContactFormSubmissionInputSchema},
  output: {schema: SummarizeContactFormSubmissionOutputSchema},
  prompt: `Summarize the following contact form submission in one short sentence:\n\nName: {{{name}}}\nEmail: {{{email}}}\nMessage: {{{message}}}`,
});

const summarizeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'summarizeContactFormSubmissionFlow',
    inputSchema: SummarizeContactFormSubmissionInputSchema,
    outputSchema: SummarizeContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
