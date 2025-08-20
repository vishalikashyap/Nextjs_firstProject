import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  email: { type: String, required: true, unique: true },
  otp: { type: String, default: null },
  otpMethod: { type: String, enum: ["email", "phone"], required: true },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

delete mongoose.models.User;
export default mongoose.models.User || mongoose.model("User", userSchema);
