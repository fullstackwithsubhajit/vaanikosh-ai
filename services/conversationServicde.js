import Conversation from "@/models/Conversation";

// Create a new conversation
export async function createConversation(userId, language = "en") {
  return await Conversation.create({
    user: userId,
    language,
    status: "ACTIVE",
    messages: [],
  });
}

// Add a message to an existing conversation
export async function addMessage(
  conversationId,
  speaker,
  content,
  intent = ""
) {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        messages: {
          speaker,
          content,
          intent,
          timestamp: new Date(),
        },
      },
    },
    { new: true }
  );
}

// Get a conversation
export async function getConversation(conversationId) {
  return await Conversation.findById(conversationId)
    .populate("user");
}

// Complete a conversation
export async function completeConversation(conversationId) {
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