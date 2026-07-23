import ai from "@/lib/gemini";

import {
  buildIntentPrompt,
  buildReplyPrompt,
} from "@/lib/promptManager";

import {
  processConversation,
} from "@/lib/conversationOrchestrator";

import {
  getActiveConversation,
  createConversation,
  addMessage,
  updateConversationState,
} from "@/services/conversationService";

import paymentService from "@/services/paymentService";
import coachService from "@/services/coachService";

import User from "@/models/User";

async function handlePayment(userId, state) {

    return await paymentService.processPayment({

        userId,

        recipient: state.collectedEntities.recipient,

        amount: state.collectedEntities.amount,

        purpose: state.collectedEntities.purpose

    });

}


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

    const aiResponse = await extractIntent({

        message,

        language,

        conversation

    });

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

    const workflow = processConversation(aiResponse);

    /*
    --------------------------------
    Execute Intent
    --------------------------------
    */

    const backendResult = await executeIntent({

        userId,

        state: updatedState,

        workflow

    });

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