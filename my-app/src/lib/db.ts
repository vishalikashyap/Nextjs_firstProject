import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "nextjs_first",
    });

    isConnected = true;
    console.log("MongoDB Connected to nextjs_first");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
