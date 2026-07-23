import { NextResponse } from "next/server";

import { evaluateRisk } from "@/lib/riskEngine";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      conversation,
      amount,
      isNewReceiver,
      transactionTime,
    } = body;

    // -----------------------
    // Validation
    // -----------------------

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------
    // Risk Evaluation
    // -----------------------

    const risk = await evaluateRisk({
      conversation,
      amount,
      isNewReceiver,
      transactionTime: transactionTime
        ? new Date(transactionTime)
        : new Date(),
    });

    // -----------------------
    // Return Result
    // -----------------------

    return NextResponse.json({
      success: true,
      risk,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}