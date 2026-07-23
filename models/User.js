import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
  },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

    phone: {
    type: String,
    required: true,
  },

    preferredLanguage: {
   type: String,
  enum: [
    "English",
    "Hindi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi"
  ],
  default: "English",
  required: true,
},

    upiId: {
    type: String,
    default: "",
  },

    createdAt: {
    type: Date,
    default: Date.now,
  },

    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  voiceSettings: {
  enabled: {
    type: Boolean,
    default: true,
  },

  speechSpeed: {
    type: Number,
    default: 1,
  },

  voiceGender: {
    type: String,
    enum: ["MALE", "FEMALE", "DEFAULT"],
    default: "DEFAULT",
  },
},

aiSettings: {
  coachEnabled: {
    type: Boolean,
    default: true,
  },

  scamProtection: {
    type: Boolean,
    default: true,
  },

  explainTransactions: {
    type: Boolean,
    default: true,
  },
},

isVerified: {
  type: Boolean,
  default: false,
},

failedLoginAttempts: {
  type: Number,
  default: 0,
},

lastPasswordChanged: {
  type: Date,
},


statistics: {
  totalTransactions: {
    type: Number,
    default: 0,
  },

  totalSpent: {
    type: Number,
    default: 0,
  },

  totalReceived: {
    type: Number,
    default: 0,
  },
},

});


const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;