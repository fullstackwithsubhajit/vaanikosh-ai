import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";

import {
  getTransactionHistory,
} from "@/services/historyService";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      userId,
      filters = {},
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

    const history =
      await getTransactionHistory(
        userId,
        filters
      );

    return NextResponse.json(history);

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