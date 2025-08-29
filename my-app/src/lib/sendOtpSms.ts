import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export default async function sendOtpSms(phone: string, otp: string) {
  try {
    const message = await client.messages.create({
      body: `🔑 Your OTP code is: ${otp}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: "+91"+ phone,
    });

    console.log("✅ OTP SMS sent:", message.sid);
  } catch (error: any) {
    console.error("❌ Twilio Error:", error.message);
    throw new Error("Failed to send OTP SMS");
  }
}