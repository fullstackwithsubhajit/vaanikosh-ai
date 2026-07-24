import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    // Owner of this saved recipient
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Display name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Nickname used in voice commands
    nickname: {
      type: String,
      trim: true,
      default: "",
    },

    // UPI ID
    upiId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Bank
    bankName: {
      type: String,
      default: "",
    },

    // Account Number
    accountNumber: {
      type: String,
      default: "",
    },

    // IFSC
    ifscCode: {
      type: String,
      default: "",
    },

    // Saved favourite
    isFavourite: {
      type: Boolean,
      default: false,
    },

    // Trusted by user
    isTrusted: {
      type: Boolean,
      default: false,
    },

    // Number of transactions
    totalTransactions: {
      type: Number,
      default: 0,
    },

    // Total money sent
    totalAmountSent: {
      type: Number,
      default: 0,
    },

    // Last payment
    lastPaidAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

recipientSchema.index({
    owner:1,
    upiId:1
});

const Recipient =
mongoose.models.Recipient ||
mongoose.model(
    "Recipient",
    recipientSchema
);

export default Recipient;