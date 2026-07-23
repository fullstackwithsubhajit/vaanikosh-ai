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
});

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;