'use server';
/**
 * @fileOverview Forwards contact form submissions to a specified email address.
 *
 * - summarizeContactFormSubmission - A function that takes contact form data and sends it as an email.
 * - SummarizeContactFormSubmissionInput - The input type for the function.
 * - SummarizeContactFormSubmissionOutput - The return type for the function.
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
  status: z.string().describe('The status of the email sending operation.'),
});
export type SummarizeContactFormSubmissionOutput = z.infer<typeof SummarizeContactFormSubmissionOutputSchema>;

export async function summarizeContactFormSubmission(input: SummarizeContactFormSubmissionInput): Promise<SummarizeContactFormSubmissionOutput> {
  return summarizeContactFormSubmissionFlow(input);
}

const sendEmailTool = ai.defineTool(
    {
      name: 'sendEmail',
      description: 'Sends an email to a specified recipient.',
      inputSchema: z.object({
        to: z.string().email(),
        subject: z.string(),
        body: z.string(),
      }),
      outputSchema: z.object({
        status: z.string(),
      })
    },
    async ({ to, subject, body }) => {
      // In a real application, this would integrate with an email sending service (e.g., SendGrid, Mailgun).
      // For this simulation, we'll just log the action and return success.
      console.log(`Simulating sending email to: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${body}`);
      return { status: 'Email sent successfully' };
    }
  );

const prompt = ai.definePrompt({
  name: 'summarizeContactFormSubmissionPrompt',
  input: {schema: SummarizeContactFormSubmissionInputSchema},
  output: {schema: SummarizeContactFormSubmissionOutputSchema},
  prompt: `You are an email forwarding agent. A user has submitted a contact form on the ToolsyBro website. Your task is to forward this message to the site owner at introcarditaly@gmail.com.

The subject of the email should be "New Contact Form Submission from {name}".
The body of the email should contain the following information clearly formatted:

Name: {name}
Email: {email}
Message: {message}

You must construct and send this email. After sending, confirm the operation's success.
`,
  tools: [sendEmailTool],
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
