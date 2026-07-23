import { NextResponse } from "next/server";

import ai from "@/lib/gemini";

import { buildIntentPrompt } from "@/lib/promptManager";

import { processConversation } from "@/lib/conversationOrchestrator";

await dbConnect();

export async function POST(request) {

    try {

        const body = await request.json();

        const {

            message,

            language = "English"

        } = body;

        // -------------------------
        // Validation
        // -------------------------

        if (!message) {

            return NextResponse.json(

                {

                    success: false,

                    message: "Message is required."

                },

                {

                    status: 400

                }

            );

        }

        // -------------------------
        // Build Prompt
        // -------------------------

        const prompt = buildIntentPrompt(

            message,

            language

        );

        // -------------------------
        // Gemini
        // -------------------------

        const result = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

        // -------------------------
        // Gemini Response
        // -------------------------

        const cleanText = result.text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const aiResponse = JSON.parse(cleanText);

        try {

            aiResponse = JSON.parse(text);

        }

        catch {

            return NextResponse.json(

                {

                    success: false,

                    message: "Gemini returned invalid JSON.",

                    raw: text

                },

                {

                    status: 500

                }

            );

        }

        // -------------------------
        // Conversation Engine
        // -------------------------

        const finalResponse = await processConversation(

            aiResponse

        );

        // -------------------------
        // Return
        // -------------------------

        return NextResponse.json(

            {

                success: true,

                ai: aiResponse,

                response: finalResponse

            }

        );

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            {

                success: false,

                message: error.message

            },

            {

                status: 500

            }

        );

    }

}