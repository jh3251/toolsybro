'use server';
/**
 * @fileOverview An AI flow to remove the background from an image.
 *
 * - removeImageBackground - A function that takes an image and returns a version with the background removed.
 * - RemoveImageBackgroundInput - The input type for the removeImageBackground function.
 * - RemoveImageBackgroundOutput - The return type for the removeImageBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RemoveImageBackgroundInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of the subject, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RemoveImageBackgroundInput = z.infer<typeof RemoveImageBackgroundInputSchema>;

const RemoveImageBackgroundOutputSchema = z.object({
    resultDataUri: z.string().describe('The resulting image with the background removed, as a data URI.'),
});
export type RemoveImageBackgroundOutput = z.infer<typeof RemoveImageBackgroundOutputSchema>;

export async function removeImageBackground(input: RemoveImageBackgroundInput): Promise<RemoveImageBackgroundOutput> {
  return removeImageBackgroundFlow(input);
}

const removeImageBackgroundFlow = ai.defineFlow(
  {
    name: 'removeImageBackgroundFlow',
    inputSchema: RemoveImageBackgroundInputSchema,
    outputSchema: RemoveImageBackgroundOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            { media: { url: input.imageDataUri } },
            { text: 'Remove the background from this image. The output should be a PNG with a transparent background, preserving the original dimensions and subject.' },
        ],
        config: {
            responseModalities: ['IMAGE'],
        },
    });

    if (!media.url) {
        throw new Error('The AI model did not return an image. Please try again.');
    }
    
    return {
      resultDataUri: media.url,
    };
  }
);
