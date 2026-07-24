import Conversation from "@/models/Conversation";

/**
 * Create a new conversation
 */
export async function createConversation(userId, language = "en") {
  return await Conversation.create({
    user: userId,
    language,
    status: "ACTIVE",
    messages: [],
    state: {
      currentIntent: null,
      collectedEntities: {
        recipient: null,
        amount: null,
        purpose: "",
      },
      waitingFor: null,
      nextAction: null,
      completed: false,
    },
  });
}

/**
 * Get conversation by ID
 */
export async function getConversation(conversationId) {
  return await Conversation.findById(conversationId).populate("user");
}

/**
 * Get latest active conversation
 */
export async function getActiveConversation(userId) {
  return await Conversation.findOne({
    user: userId,
    status: "ACTIVE",
  }).sort({ updatedAt: -1 });
}

/**
 * Save a message
 */
export async function addMessage(
  conversationId,
  speaker,
  content
) {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        messages: {
          speaker,
          content,
          timestamp: new Date(),
        },
      },
    },
    {
      new: true,
    }
  );
}

/**
 * Update AI State
 */
export async function updateConversationState(
  conversationId,
  state
) {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    {
      state,
    },
    {
      new: true,
    }
  );
}

/**
 * Clear state after completion
 */
export async function clearConversationState(
  conversationId
) {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    {
      state: {
        currentIntent: null,
        collectedEntities: {
          recipient: null,
          amount: null,
          purpose: "",
        },
        waitingFor: null,
        nextAction: null,
        completed: true,
      },
    },
    {
      new: true,
    }
  );
}

/**
 * Mark conversation completed
 */
export async function completeConversation(
  conversationId
) {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    {
      status: "COMPLETED",
    },
    {
      new: true,
    }
  );
}