// app/api/ai/route.js

import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";

import { processAI } from "@/services/aiService";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      userId,
      message,
      language = "English",
      conversationId = null,
    } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await processAI({
      userId,
      message,
      language,
      conversationId,
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