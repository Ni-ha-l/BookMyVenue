export const otpEmailTemplate = (otp: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px;">
    <h2 style="color: #333; margin-bottom: 8px;">BookMyVenue</h2>
    <p style="color: #555;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
    <div style="text-align: center; margin: 32px 0;">
      <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #4F46E5;">${otp}</span>
    </div>
    <p style="color: #888; font-size: 13px;">If you did not request this, ignore this email.</p>
  </div>
</body>
</html>
`;

export const verificationEmailTemplate = (link: string): string => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px;">
    <h2 style="color: #333;">Verify your BookMyVenue account</h2>
    <p style="color: #555;">Click the button below to verify your email address.</p>
    <a href="${link}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">Verify Email</a>
    <p style="color: #888; font-size: 13px; margin-top: 24px;">Link expires in 24 hours.</p>
  </div>
</body>
</html>
`;
