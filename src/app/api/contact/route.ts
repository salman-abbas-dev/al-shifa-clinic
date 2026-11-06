import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { createContactInquiry } from "@/repositories/contact.repository";
import { handleApiError } from "@/lib/utils/api-error";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Zod Validation
    const validatedData = contactSchema.parse(body);

    // 2. Save to Database
    await createContactInquiry({
      name: validatedData.name,
      email: validatedData.email || null,
      phone: validatedData.phone,
      subject: validatedData.subject || null,
      message: validatedData.message,
      is_read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}