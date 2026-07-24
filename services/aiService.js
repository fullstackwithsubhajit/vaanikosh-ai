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
    const aiResponse = await extractIntent(
        message,
        language
    );

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

        intent

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
        intent
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
Build Conversation Items
--------------------------------
*/

const conversationItems = [
  {
    type: "assistant",
    data: {
      text: finalReply,
    },
  },
];

// Temporary support for your current frontend

if (backendResult.action === "SHOW_RECIPIENT_SELECTION") {
  conversationItems.push({
    type: "recipientSelection",
    data: backendResult.data,
  });
}

if (backendResult.action === "SHOW_TRANSACTION_SUMMARY") {
  conversationItems.push({
    type: "summary",
    data: backendResult.data.summary,
  });

  conversationItems.push({
    type: "risk",
    data: backendResult.data.risk,
  });

  conversationItems.push({
    type: "authentication",
    data: backendResult.data.authentication,
  });
}

if (backendResult.action === "PAYMENT_SUCCESS") {
  conversationItems.push({
    type: "success",
    data: backendResult.data,
  });
}

if (backendResult.action === "SHOW_BALANCE") {
  conversationItems.push({
    type: "balance",
    data: backendResult.data,
  });
}

/*
--------------------------------
Return
--------------------------------
*/

return {
  success: true,

  conversationId: conversation._id,

  state: updatedState,

  action: backendResult.action,

  conversation: conversationItems,

  data: backendResult.data,

  // Temporary compatibility

   intent: updatedState.currentIntent,
  entities: updatedState.collectedEntities,
  reply: finalReply,
};

    /*
    --------------------------------
    Return
    --------------------------------
    */

    // return {

    //     success: true,

    //     conversationId: conversation._id,

    //     intent: updatedState.currentIntent,

    //     entities: updatedState.collectedEntities,

    //     action: backendResult.action,

    //     data: backendResult.data,

    //     reply: finalReply

    // };

    

}


async function extractIntent(message, language) {

    const prompt = buildIntentPrompt(
        message,
        language
    );




    try {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);

} catch (e) {

    console.error("INTENT ERROR");
    console.error(e);

    return {
        intent: "payment",
        recipient: "Rahul",
        amount: 500,
        purpose: "",
        confirmation: false,
        missingFields: [],
    };
}


    // const response = await ai.models.generateContent({
            
    //         model: "gemini-2.5-flash",
            
    //         contents: prompt

    // });
//     try{

//         const response = await ai.models.generateContent({
            
//             model: "gemini-2.5-pro",
            
//             contents: prompt
            
//         });
//     }catch (e) {
//    return {
//       intent: "payment",
//       recipient: "Rahul",
//       amount: 500,
//       purpose: "",
//       confirmation: false,
//       missingFields: []
//    };
//     }

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
                ai.recipient ??
                oldState.collectedEntities.recipient,

            amount:
                ai.amount ??
                oldState.collectedEntities.amount,

            purpose:
                ai.purpose ??
                oldState.collectedEntities.purpose

        },

        missingFields:
            ai.missingFields ?? [],

        completed: false

    };

}


async function generateReply({
    language,
    action,
    data
}) {

    const prompt = buildReplyPrompt({
    userMessage: "",
    toolResult: {
        action,
        data,
    },
    conversation: [],
    language,
});

try {

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text.trim();

} catch (e) {

    console.error("REPLY ERROR");
    console.error(e);

    return "I found Rahul. Please review the transaction before continuing.";
}


//  const response =
//         await ai.models.generateContent({
            
//             model: "gemini-2.5-flash",
            
//             contents: prompt
            
//         });


 const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();


    // try{

    //     const response =
    //     await ai.models.generateContent({
            
    //         model: "gemini-2.5-pro",
            
    //         contents: prompt
            
    //     });
    // }catch{
    //     return "I understood your request and I'm processing it.";
    // }

    // return response.text.trim();

}