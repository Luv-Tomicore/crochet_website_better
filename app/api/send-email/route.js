const nodemailer = require('nodemailer')

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, itemType, description, budget, timeline, notes, cartItems } = body

    if (!name || !email || (!description && !cartItems)) {
      return Response.json({ error: 'Name, email, and order details are required.' }, { status: 400 })
    }

    const gmailUser = process.env.GMAIL_USER
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s/g, '')
    const recipient = process.env.RECIPIENT_EMAIL

    if (!gmailUser || !gmailPass || !recipient) {
      console.error('Missing email env vars:', { gmailUser: !!gmailUser, gmailPass: !!gmailPass, recipient: !!recipient })
      return Response.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const mailOptions = {
      from: `"Stitch It with Tomi — Order Form" <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `New Order Request from ${name}${itemType ? ` — ${itemType}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C1612; background: #FBF5EC; padding: 40px;">
          <div style="border-bottom: 2px dashed #C4788A; padding-bottom: 24px; margin-bottom: 32px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #C4788A; margin: 0 0 8px;">
              New Order Request
            </p>
            <h1 style="font-size: 36px; font-style: italic; font-weight: 300; margin: 0; color: #2C1612; line-height: 1;">
              Stitch-It with Tomi
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(196,120,138,0.2);">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84;">Customer</span><br/>
                <strong style="font-size: 16px;">${name}</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(196,120,138,0.2);">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84;">Email</span><br/>
                <a href="mailto:${email}" style="color: #7D2E46; font-size: 16px;">${email}</a>
                ${phone ? `<br/><span style="font-size: 12px; color: #9B8A84;">${phone}</span>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(196,120,138,0.2);">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84;">Item Type</span><br/>
                <strong style="font-size: 16px;">${itemType || 'Not specified'}</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(196,120,138,0.2);">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84;">Budget</span><br/>
                <strong style="font-size: 16px;">${budget || 'Not specified'}</strong>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid rgba(196,120,138,0.2);">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84;">Timeline</span><br/>
                <strong style="font-size: 16px;">${timeline || 'Not specified'}</strong>
              </td>
            </tr>
          </table>

          ${cartItems ? `
          <div style="margin-top: 28px; padding: 20px; background: rgba(125,46,70,0.06); border-left: 3px solid #7D2E46;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84; margin: 0 0 10px;">
              Items from Cart
            </p>
            <p style="font-size: 15px; line-height: 1.9; margin: 0; color: #2C1612;">${cartItems.split(', ').map(i => `• ${i}`).join('<br/>')}</p>
          </div>
          ` : ''}

          ${description ? `
          <div style="margin-top: 16px; padding: 20px; background: rgba(196,120,138,0.08); border-left: 3px solid #C4788A;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84; margin: 0 0 10px;">
              ${cartItems ? 'Additional Details' : "What they're envisioning"}
            </p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #2C1612;">${description.replace(/\n/g, '<br/>')}</p>
          </div>
          ` : ''}

          ${notes ? `
          <div style="margin-top: 20px; padding: 20px; background: rgba(125,46,70,0.05); border-left: 3px solid rgba(125,46,70,0.3);">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #9B8A84; margin: 0 0 10px;">
              Additional Notes
            </p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #2C1612;">${notes.replace(/\n/g, '<br/>')}</p>
          </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 24px; border-top: 2px dashed #C4788A; text-align: center;">
            <p style="font-size: 11px; color: #9B8A84; margin: 0;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
      text: `
New Order Request — Stitch It with Tomi
========================================
Customer: ${name}
Email: ${email}
Item Type: ${itemType || 'Not specified'}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

${cartItems ? `Cart Items:\n${cartItems}\n` : ''}
${description ? `Description:\n${description}\n` : ''}
${notes ? `Additional Notes:\n${notes}` : ''}
      `.trim(),
    }

    await transporter.sendMail(mailOptions)

    return Response.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return Response.json(
      { error: 'Failed to send email. Please try again or reach out on Instagram.' },
      { status: 500 }
    )
  }
}
