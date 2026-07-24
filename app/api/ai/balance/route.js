import { NextResponse } from "next/server";

// import dbConnect from "@/lib/dbConnect";
import connectDB from "@/lib/db";

import {
  getBalance,
} from "@/services/balanceService";

export async function POST(request) {
  try {

    // await dbConnect();
    await connectDB();

    const body = await request.json();

    const { userId } = body;

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

    const balance =
      await getBalance(userId);

    return NextResponse.json({
      success: true,
      balance,
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