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

export const PASSWORD_RESET_FORM_TEMPLATE = (resetLink) => `
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
      <a href="{resetURL}" style="background: linear-gradient(90deg, #282F5A 0%, #384174 100%); color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Shiki Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`;

export const ORDER_RECEIPT_TEMPLATE = function (order) {
  return `

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> Order confirmation </title>
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
      body { margin: 0; padding: 0; background: #e1e1e1; }
      div, p, a, li, td { -webkit-text-size-adjust: none; }
      .ReadMsgBody { width: 100%; background-color: #ffffff; }
      .ExternalClass { width: 100%; background-color: #ffffff; }
      body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
      html { width: 100%; }
      p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
      .visibleMobile { display: none; }
      .hiddenMobile { display: block; }
    
      @media only screen and (max-width: 600px) {
      body { width: auto !important; }
      table[class=fullTable] { width: 96% !important; clear: both; }
      table[class=fullPadding] { width: 85% !important; clear: both; }
      table[class=col] { width: 45% !important; }
      .erase { display: none; }
      }
    
      @media only screen and (max-width: 420px) {
      table[class=fullTable] { width: 100% !important; clear: both; }
      table[class=fullPadding] { width: 85% !important; clear: both; }
      table[class=col] { width: 100% !important; clear: both; }
      table[class=col] td { text-align: left !important; }
      .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
      .visibleMobile { display: block !important; }
      .hiddenMobile { display: none !important; }
      }
    </style>
    
    
    <!-- Header -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
      <tr>
        <td height="20"></td>
      </tr>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
            <tr class="hiddenMobile">
              <td height="40"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="30"></td>
            </tr>
    
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr>
                              <td align="left"> <img src=${'https://api.translatedbynative.com/logo/logo.png'} width="50" height="50" alt="logo" border="0" /></td>
                            </tr>
                            <tr class="hiddenMobile">
                              <td height="40"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                                Hello, ${order.name}.
                                <br> Thank You for Choosing Our Document Translation Service.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td height="5"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                                Invoice
                              </td>
                            </tr>
                            <tr>
                            <tr class="hiddenMobile">
                              <td height="50"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                                <small>ORDER</small> #${order._id}<br />
                                <small>${order.createdAt}</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- /Header -->
    <!-- Order Details -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
      <tbody>
        <tr>
          <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
              <tbody>
                <tr>
                <tr class="hiddenMobile">
                  <td height="60"></td>
                </tr>
                <tr class="visibleMobile">
                  <td height="40"></td>
                </tr>
                <tr>
                  <td>
                    <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                      <tbody>
                        <tr>
                          <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                            Document
                          </th>
                          <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                            <small>Words</small>
                          </th>
                          <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                            Subtotal
                          </th>
                        </tr>
                        <tr>
                          <td height="1" style="background: #bebebe;" colspan="4"></td>
                        </tr>
                        <tr>
                          <td height="10" colspan="4"></td>
                        </tr>
                             ${order.docData.map(doc => `
                        <tr key="${doc.id}"> 
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000; line-height: 18px; vertical-align: top; padding: 10px 0;" class="article">${doc.fileName}</td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding: 10px 0;">
                            <small>${doc.wordsCount}</small>
                          </td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; line-height: 18px; vertical-align: top; padding: 10px 0;" align="right">${currencySymbol.symbol(order.currency)}${doc.price}</td>
                        </tr>
                        `).join('')}
                        <tr>
                          <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                        </tr>
                        <tr>
                          <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td height="20"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- /Order Details -->
    <!-- Total -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
      <tbody>
        <tr>
          <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
              <tbody>
                <tr>
                  <td>
    
                    <!-- Table Total -->
                    <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                      <tbody>
                        <tr>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                            Subtotal
                          </td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                          ${currencySymbol.symbol(order.currency)}${order.totalPricing}
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                            Shipping &amp; Handling
                          </td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                          ${currencySymbol.symbol(order.currency)}00.00
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                            <strong>Grand Total (Incl.Tax)</strong>
                          </td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                            <strong>${currencySymbol.symbol(order.currency)}${order.totalPricing}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- /Table Total -->
    
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- /Total -->
    <!-- Information -->
<!-- /Total -->
    <!-- Information -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
      <tbody>
        <tr>
          <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
              <tbody>
                <tr>
                <tr class="hiddenMobile">
                  <td height="60"></td>
                </tr>
                <tr class="visibleMobile">
                  <td height="40"></td>
                </tr>
                <tr>
                  <td>
                    <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                      <tbody>
                        <tr>
                          <td>
                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                              <tbody>
                                <tr>
                                  <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                    <strong>BILLING INFORMATION</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    Line 1 : ${order.customer_address.line1} <br> Line 2: ${order.customer_address.line2},<br> ${order?.customer_address?.city}, ${order.customer_address.postal_code}, ${order.customer_address.country}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                              <tbody>
                                <tr>
                                  <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    <strong>CONTACT INFORMATION</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    ${order.name}<br> T: ${order.phone} <br> E: ${order.email}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr class="hiddenMobile">
                  <td height="60"></td>
                </tr>
                <tr class="visibleMobile">
                  <td height="30"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- /Information -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                        Have a nice day.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="spacer">
              <td height="50"></td>
            </tr>
    
          </table>
        </td>
      </tr>
      <tr>
        <td height="20"></td>
      </tr>
    </table>
    `;
};