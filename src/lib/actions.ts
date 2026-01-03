
"use server";

import { z } from "zod";
import { summarizeContactFormSubmission } from "@/ai/flows/summarize-contact-form-submission";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormState = {
    type: 'success' | 'error';
    message: string;
    errors?: any;
}

export async function submitContactForm(prevState: any, formData: FormData): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  try {
    const { name, email, message } = validatedFields.data;

    // Call the Genkit flow to forward the message to the specified email
    await summarizeContactFormSubmission({
        name,
        email,
        message,
    });

    return {
      type: "success",
      message: "Thank you for your message!",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      type: "error",
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
