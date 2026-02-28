const generateWelcomeTemplate = (name, clientUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
                 style="background:#ffffff; padding:40px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

            <tr>
              <td align="center">
                <h1 style="color:#333; margin-bottom:10px;">
                  Welcome, ${name}! 🎉
                </h1>
                <p style="color:#555; font-size:16px; line-height:1.6;">
                  We're excited to have you onboard. Your account has been successfully created.
                </p>

                <p style="color:#555; font-size:16px; line-height:1.6;">
                  You can now explore all the features and start your journey with us.
                </p>

                <a href="${clientUrl}"
                   style="display:inline-block; margin:25px 0; padding:14px 28px;
                          background:linear-gradient(135deg,#4f46e5,#3b82f6);
                          color:#ffffff; text-decoration:none;
                          border-radius:6px; font-size:16px; font-weight:bold;">
                  Get Started
                </a>

                <p style="color:#777; font-size:14px; margin-top:20px;">
                  If you have any questions, feel free to reply to this email — we're happy to help!
                </p>

                <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

                <p style="color:#999; font-size:12px;">
                  This email was sent because you signed up on our platform.
                </p>
              </td>
            </tr>

          </table>

          <p style="color:#aaa; font-size:12px; margin-top:20px;">
            © ${new Date().getFullYear()} Your App Name. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
