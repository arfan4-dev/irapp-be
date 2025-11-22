import currencySymbol from 'currency-symbol'
export const EMAIL_VERIFICATION_TEMPLATE = (verificationLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #282F5A; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background: radial-gradient(112.6% 401.18% at 100% -7.07%, rgba(3, 103, 252, 0.175) 0%, rgba(1, 167, 254, 0.1) 42.66%, rgba(3, 103, 252, 0.175) 98.54%); padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{verificationLink}" style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
    </div>
    <p>If you didn’t sign up for this account, you can safely ignore this email.</p>
    <p>Best regards,<br>Shiki Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #282F5A; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background: radial-gradient(112.6% 401.18% at 100% -7.07%, rgba(3, 103, 252, 0.175) 0%, rgba(1, 167, 254, 0.1) 42.66%, rgba(3, 103, 252, 0.175) 98.54%); padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #282F5A; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Shiki Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #282F5A; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background: radial-gradient(112.6% 401.18% at 100% -7.07%, rgba(3, 103, 252, 0.175) 0%, rgba(1, 167, 254, 0.1) 42.66%, rgba(3, 103, 252, 0.175) 98.54%); padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetLink}" style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 15 mints for security reasons.</p>
    <p>Best regards,<br>Shiki Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`;



