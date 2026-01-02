"use server";

import { z } from "zod";
import { summarizeContactFormSubmission } from "@/ai/flows/summarize-contact-form-submission";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
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

    // Here you would typically save to Firestore
    // For example: await db.collection("contact_messages").add({ name, email, message, createdAt: new Date() });
    console.log("Simulating save to Firestore:", { name, email, message });
    
    // Call the GenAI flow to summarize the message
    const { summary } = await summarizeContactFormSubmission({
        name,
        email,
        message,
    });

    return {
      type: "success",
      message: "Thank you for your message! We've received it.",
      summary: `AI Summary: "${summary}"`,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      type: "error",
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
