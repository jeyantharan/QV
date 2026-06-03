import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, guests, date, time, message } = await req.json();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qvtrattoria@gmail.com',
        pass: 'dqrx gnds xtns qxpx' // User will need to replace this
      }
    });

    const mailOptions = {
      from: '"QV Trattoria Concierge" <qvtrattoria@gmail.com>',
      to: 'qvtrattoria@gmail.com',
      replyTo: email,
      subject: `Reservation: ${name} (${guests} Guests)`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Outfit', sans-serif; color: #ffffff;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;">
                    
                    <!-- Trending Header -->
                    <tr>
                      <td style="padding-bottom: 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td>
                              <span style="background-color: #c5a059; color: #000; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1px;">New Request</span>
                            </td>
                            <td align="right">
                              <span style="color: #666; font-size: 11px;">${new Date().toLocaleTimeString()}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Bento Card 1: Guest Info -->
                    <tr>
                      <td style="background-color: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 16px; padding: 30px; margin-bottom: 20px;">
                        <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 400; letter-spacing: -0.5px; color: #ffffff;">${name}</h2>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Guest Count</span>
                            </td>
                            <td align="right" style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <span style="color: #c5a059; font-size: 14px; font-weight: 600;">${guests} PERSONS</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Date & Time</span>
                            </td>
                            <td align="right" style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <span style="color: #ffffff; font-size: 14px;">${date} at ${time}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Phone</span>
                            </td>
                            <td align="right" style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                              <a href="tel:${phone}" style="color: #ffffff; text-decoration: none; font-size: 14px;">${phone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <span style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Email</span>
                            </td>
                            <td align="right" style="padding: 10px 0;">
                              <a href="mailto:${email}" style="color: #ffffff; text-decoration: none; font-size: 14px;">${email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr><td style="height: 15px;"></td></tr>

                    <!-- Bento Card 2: Message -->
                    ${message ? `
                    <tr>
                      <td style="background-color: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 16px; padding: 30px;">
                        <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 15px;">Specific Requirements</span>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #aaa; font-style: italic;">"${message}"</p>
                      </td>
                    </tr>
                    ` : ''}

                    <!-- Trending Footer -->
                    <tr>
                      <td align="center" style="padding-top: 50px;">
                        <div style="width: 40px; height: 1px; background-color: #333; margin-bottom: 20px;"></div>
                        <p style="margin: 0; color: #444; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; font-weight: 600;">QV TRATTORIA</p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Reservation sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Failed to send reservation' }, { status: 500 });
  }
}
