'use server';
/**
 * @fileOverview An AI flow for generating mathematical formulas.
 *
 * - generateMathFormula - A function that takes a topic and returns a formula and explanation.
 * - GenerateMathFormulaInput - The input type for the generateMathFormula function.
 * - GenerateMathFormulaOutput - The return type for the generateMathFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMathFormulaInputSchema = z.object({
  topic: z.string().describe('The topic or name of the formula to generate, e.g., "quadratic formula" or "area of a circle".'),
});
export type GenerateMathFormulaInput = z.infer<typeof GenerateMathFormulaInputSchema>;

const GenerateMathFormulaOutputSchema = z.object({
  formula: z.string().describe('The generated mathematical formula in a clean, readable string format. Use common notation like ^ for exponents.'),
  explanation: z.string().describe('A clear, step-by-step explanation of what the formula is, what its components mean, and how to use it. Use Markdown for formatting.'),
});
export type GenerateMathFormulaOutput = z.infer<typeof GenerateMathFormulaOutputSchema>;

export async function generateMathFormula(input: GenerateMathFormulaInput): Promise<GenerateMathFormulaOutput> {
  return generateMathFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMathFormulaPrompt',
  input: {schema: GenerateMathFormulaInputSchema},
  output: {schema: GenerateMathFormulaOutputSchema},
  prompt: `You are a math expert. Your task is to generate a mathematical formula and a clear explanation based on the user's topic.

Provide the formula in a simple, readable string format in the 'formula' field.
Provide a clear, step-by-step explanation of the formula, its variables, and its use in the 'explanation' field. Use Markdown for formatting.

Topic: {{{topic}}}`,
});

const generateMathFormulaFlow = ai.defineFlow(
  {
    name: 'generateMathFormulaFlow',
    inputSchema: GenerateMathFormulaInputSchema,
    outputSchema: GenerateMathFormulaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
