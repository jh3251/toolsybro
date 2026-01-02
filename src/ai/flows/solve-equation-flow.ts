
'use server';
/**
 * @fileOverview An AI flow for solving mathematical equations.
 *
 * - solveEquation - A function that takes an equation and returns the solution and steps.
 * - SolveEquationInput - The input type for the solveEquation function.
 * - SolveEquationOutput - The return type for the solveEquation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveEquationInputSchema = z.object({
  equation: z.string().describe('The mathematical equation to solve.'),
});
export type SolveEquationInput = z.infer<typeof SolveEquationInputSchema>;

const SolveEquationOutputSchema = z.object({
  solution: z.string().describe('The final solution to the equation, like "x = 5" or "x = 2, x = 3".'),
  steps: z.string().describe('A step-by-step explanation of how the solution was reached. Format using Markdown for clarity.'),
});
export type SolveEquationOutput = z.infer<typeof SolveEquationOutputSchema>;

export async function solveEquation(input: SolveEquationInput): Promise<SolveEquationOutput> {
  return solveEquationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveEquationPrompt',
  input: {schema: SolveEquationInputSchema},
  output: {schema: SolveEquationOutputSchema},
  prompt: `You are a highly skilled math expert. Your task is to solve the given mathematical equation.

Provide the final answer in the 'solution' field.
Provide a clear, step-by-step explanation of how to arrive at the solution in the 'steps' field. Use Markdown for formatting, such as for fractions or exponents.

Equation: {{{equation}}}`,
});

const solveEquationFlow = ai.defineFlow(
  {
    name: 'solveEquationFlow',
    inputSchema: SolveEquationInputSchema,
    outputSchema: SolveEquationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
