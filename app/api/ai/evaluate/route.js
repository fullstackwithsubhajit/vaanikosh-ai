import { NextResponse } from "next/server";

// import dbConnect from "@/lib/dbConnect";
import connectDB from "@/lib/db";

import {
  evaluateRisk,
} from "@/lib/riskEngine";

export async function POST(request) {
  try {

    // await dbConnect();
    await connectDB();

    const body = await request.json();

    const {
      conversation,
      amount,
      isNewRecipient,
      transactionTime,
    } = body;

    const risk =
      await evaluateRisk({

        conversation,

        amount,

        isNewRecipient,

        transactionTime,

      });

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