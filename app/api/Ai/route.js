import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";

import { processAI } from "@/services/aiService";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      userId,
      conversationId = null,
      message = "",
      language = "English",

      // Frontend interaction events
      selectedRecipientId = null,
      confirmed = false,
      authentication = null,
    } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        { status: 400 }
      );
    }

    const result = await processAI({
      userId,
      conversationId,
      message,
      language,
      selectedRecipientId,
      confirmed,
      authentication,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}