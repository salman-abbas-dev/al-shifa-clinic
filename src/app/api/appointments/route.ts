import { NextResponse } from "next/server";
import { processNewAppointment } from "@/services/appointment.service";
import { handleApiError } from "@/lib/utils/api-error";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const appointment = await processNewAppointment(body);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        data: {
          reference_code: appointment.reference_code,
          appointment_date: appointment.appointment_date,
          appointment_time: appointment.appointment_time,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}