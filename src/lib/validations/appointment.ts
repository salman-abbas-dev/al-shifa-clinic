import { z } from "zod";

// Validates Pakistani numbers: 03XXXXXXXXX, +923XXXXXXXXX, 00923XXXXXXXXX
const pakistaniPhoneRegex = /^((\+92)|(0092)|0)3[0-9]{2}\-?[0-9]{7}$/;

export const appointmentSchema = z.object({
  patient_name: z.string().min(2, "Name must be at least 2 characters long").max(100, "Name is too long"),
  phone: z.string().regex(pakistaniPhoneRegex, "Invalid Pakistani phone number"),
  whatsapp: z.string().regex(pakistaniPhoneRegex, "Invalid WhatsApp number").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  age: z.coerce.number().min(1, "Age must be at least 1").max(120, "Invalid age").optional().or(z.nan()),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  consultation_type: z.string().min(2, "Please select a consultation type"),
  appointment_date: z.string().refine((dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Appointment date cannot be in the past"),
  appointment_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  reason: z.string().max(500, "Reason is too long").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;