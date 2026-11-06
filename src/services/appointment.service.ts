// Removed the unused AppointmentFormValues import
import { appointmentSchema } from "@/lib/validations/appointment";
import { createAppointmentRecord, checkTimeSlotConflict } from "@/repositories/appointment.repository";
import { ApiError } from "@/lib/utils/api-error";

function generateReferenceCode(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REF-${datePart}-${randomPart}`;
}

export async function processNewAppointment(rawData: unknown) {
  // 1. Zod Validation
  const validatedData = appointmentSchema.parse(rawData);

  // 2. Business Logic: Check Availability (Prevent Double Booking)
  const isConflict = await checkTimeSlotConflict(
    validatedData.appointment_date,
    validatedData.appointment_time
  );

  if (isConflict) {
    throw new ApiError("The selected time slot is already booked. Please choose a different time.", 409);
  }

  // 3. Generate Unique Reference Code
  const referenceCode = generateReferenceCode();

  // 4. Save to Database via Repository
  const appointment = await createAppointmentRecord({
    reference_code: referenceCode,
    patient_name: validatedData.patient_name,
    phone: validatedData.phone,
    whatsapp: validatedData.whatsapp || null,
    email: validatedData.email || null,
    age: validatedData.age && !isNaN(validatedData.age) ? validatedData.age : null,
    gender: validatedData.gender || null,
    consultation_type: validatedData.consultation_type,
    appointment_date: validatedData.appointment_date,
    appointment_time: validatedData.appointment_time + ":00", // Ensure time format matches PostgreSQL (HH:MM:SS)
    reason: validatedData.reason || null,
    status: "pending",
    source: "website",
  });

  return appointment;
}