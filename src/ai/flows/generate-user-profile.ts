
'use server';
/**
 * @fileOverview An AI flow for generating random user profiles.
 *
 * - generateUserProfile - A function that takes a country and returns a username, full name, and address.
 * - GenerateUserProfileInput - The input type for the generateUserProfile function.
 * - GenerateUserProfileOutput - The return type for the generateUserProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUserProfileInputSchema = z.object({
  country: z.string().describe('The country to generate the user profile for.'),
});
export type GenerateUserProfileInput = z.infer<typeof GenerateUserProfileInputSchema>;

const GenerateUserProfileOutputSchema = z.object({
  username: z.string().describe('A creative and unique username, combining adjectives, nouns, and numbers.'),
  fullName: z.string().describe('A common full name for the specified country.'),
  address: z.string().describe('A realistic, but completely fictional, full address including street, city, and postal code for the specified country. Do not use real street names.'),
});
export type GenerateUserProfileOutput = z.infer<typeof GenerateUserProfileOutputSchema>;

export async function generateUserProfile(input: GenerateUserProfileInput): Promise<GenerateUserProfileOutput> {
  return generateUserProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUserProfilePrompt',
  input: {schema: GenerateUserProfileInputSchema},
  output: {schema: GenerateUserProfileOutputSchema},
  prompt: `You are a user profile generator. Based on the provided country, create a plausible but entirely fictional user profile.

Country: {{{country}}}`,
});

const generateUserProfileFlow = ai.defineFlow(
  {
    name: 'generateUserProfileFlow',
    inputSchema: GenerateUserProfileInputSchema,
    outputSchema: GenerateUserProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
