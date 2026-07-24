import ai from "@/lib/gemini";

import {
  buildIntentPrompt,
  buildReplyPrompt,
} from "@/lib/promptManager";

import { validateIntent } from "@/lib/intentValidator";

import { determineNextAction } from "@/lib/conversationOrchestrator";

import { dispatchAction } from "@/lib/toolDispatcher";

import {
  getConversation,
  getActiveConversation,
  createConversation,
  addMessage,
  updateConversationState,
} from "./conversationService";



export async function processAI({

    userId,

    message,

    language = "English",

    conversationId = null

}) {

    /*
    --------------------------------
    Get or Create Conversation
    --------------------------------
    */

    let conversation;

    if (conversationId) {

        conversation = await getConversation(conversationId);

    } else {

        conversation = await getActiveConversation(userId);

        if (!conversation) {

            conversation = await createConversation(

                userId,

                language

            );

        }

    }

    /*
    --------------------------------
    Save USER Message
    --------------------------------
    */

    await addMessage(

        conversation._id,

        "USER",

        message

    );

    /*
    --------------------------------
    Gemini Call #1
    --------------------------------
    */
    const validation = validateIntent(aiResponse);

    if (!validation.valid) {

        throw new Error("Invalid AI response.");

    }

    const intent = validation.data;

    

    /*
    --------------------------------
    Merge State
    --------------------------------
    */

    const updatedState = mergeConversationState(

        conversation.state,

        aiResponse

    );

    await updateConversationState(

        conversation._id,

        updatedState

    );

    /*
    --------------------------------
    Orchestrator
    --------------------------------
    */

    const workflow = determineNextAction(
        updatedState,
        aiResponse
    );

    /*
    --------------------------------
    Execute Intent
    --------------------------------
    */

    const backendResult = await dispatchAction(
        workflow.action,
        workflow.payload,
        userId
    );

    /*
    --------------------------------
    Gemini Call #2
    --------------------------------
    */

    const finalReply = await generateReply({

        language,

        action: backendResult.action,

        data: backendResult.data

    });

    /*
    --------------------------------
    Save AI Message
    --------------------------------
    */

    await addMessage(

        conversation._id,

        "AI",

        finalReply

    );

    /*
    --------------------------------
    Return
    --------------------------------
    */

    return {

        success: true,

        conversationId: conversation._id,

        intent: updatedState.currentIntent,

        entities: updatedState.collectedEntities,

        action: backendResult.action,

        data: backendResult.data,

        reply: finalReply

    };

}


async function extractIntent(message, language) {

    const prompt = buildIntentPrompt(
        message,
        language
    );

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);

}

function mergeConversationState(oldState, ai) {

    return {

        ...oldState,

        currentIntent: ai.intent,

        collectedEntities: {

            ...oldState.collectedEntities,

            recipient:
                ai.recipient ||
                oldState.collectedEntities.recipient,

            amount:
                ai.amount ||
                oldState.collectedEntities.amount,

            purpose:
                ai.purpose ||
                oldState.collectedEntities.purpose

        },

        missingFields:
            ai.missingFields || [],

        completed: false

    };

}


async function generateReply({
    language,
    action,
    data
}) {

    const prompt = buildReplyPrompt(
        action,
        data,
        language
    );

    const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

    return response.text.trim();

}