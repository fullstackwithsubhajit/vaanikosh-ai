import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    speaker: {
      type: String,
      enum: ["USER", "AI"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    language: {
      type: String,
      default: "en",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
      default: "ACTIVE",
    },

    messages: [messageSchema],

    state: {
      currentIntent: {
        type: String,
        default: null,
      },

      collectedEntities: {
        recipient: {
          type: String,
          default: null,
        },

        amount: {
          type: Number,
          default: null,
        },

        purpose: {
          type: String,
          default: "",
        },
      },

      waitingFor: {
        type: String,
        default: null,
      },

      nextAction: {
        type: String,
        default: null,
      },

      completed: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;