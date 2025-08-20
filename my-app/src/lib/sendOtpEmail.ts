import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "help.grabsy@gmail.com",
    pass: "jejn ahpl rqvh omld", // App password
  },
});

export default async function sendOtpEmail(to: string, otp: string) {
  try {
    const info = await transporter.sendMail({
      from: `"LearnWithUs App" <help.grabsy@gmail.com>`,
      to,
      subject: "Your LearnWithUs OTP Code",
      html: `
      <html>
      <body  align="center" style="margin:0; padding:0; background-color:#0B0C10; width:100%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 0;">
          <tr>
            <td align="center">

              <!-- OTP Card -->
              <table width="600" cellpadding="0" cellspacing="0" style="background:#1F2833; border-radius:12px; padding:50px; box-shadow:0 6px 18px rgba(0,0,0,0.3);">
                <tr>
                  <td align="center">

                    <h2 style="color:#66FCF1; font-size:28px; margin-bottom:10px;">
                      OTP Verification
                    </h2>
                    <p style="color:#C5C6C7; font-size:16px; line-height:1.5; margin-bottom:40px;">
                      Use the OTP below to complete your login.<br/>
                      This code is valid for the next <b>10 minutes</b>.
                    </p>

                    <h1 style="color:#0B0C10; background:#66FCF1; 
                               display:inline-block; padding:25px 50px; 
                               border-radius:12px; letter-spacing:10px; 
                               font-size:42px; font-weight:bold; margin:30px 0;">
                      ${otp}
                    </h1>

                    <p style="color:#C5C6C7; font-size:14px; margin-top:40px;">
                      If you did not request this code, please ignore this email.
                    </p>

                    <hr style="border:none; border-top:1px solid #45A29E; margin:40px 0;" />

                    <p style="font-size:12px; color:#888;">
                      © ${new Date().getFullYear()} LearnWithUs. All rights reserved.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
      `,
    });

    console.log("OTP Email sent: ", info.messageId);
  } catch (error) {
    console.error(" Error sending OTP Email: ", error);
    throw new Error("Failed to send OTP email");
  }
}
