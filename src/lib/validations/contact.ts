import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters long").max(1000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;