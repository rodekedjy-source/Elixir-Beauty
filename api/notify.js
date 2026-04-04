module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { name, phone, email, notes, service, date, time } = req.body
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const OWNER_EMAIL = process.env.OWNER_EMAIL
  const SITE_URL = process.env.VITE_SITE_URL || "https://elixir-beauty.vercel.app"

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const showDate = iso => {
    if (!iso) return iso
    const [y, m, d] = iso.split("-")
    return `${months[+m - 1]} ${+d}, ${y}`
  }

  const dashboardUrl = `${SITE_URL}?owner=true`

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Elixir Beauty <onboarding@resend.dev>",
        to: OWNER_EMAIL,
        subject: `🔔 New booking request from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#FDF8F2;border-radius:16px;overflow:hidden;">
            <div style="background:#2D1B3D;padding:32px 28px;text-align:center;">
              <h1 style="font-family:Georgia,serif;color:#FDF8F2;margin:0;font-size:28px;">Elixir <em style="color:#E0B05A;">Beauty</em></h1>
              <p style="color:#9688A4;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">New Booking Request</p>
            </div>
            <div style="padding:28px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Client</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Service</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${service}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${showDate(date)}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Time</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${time}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${phone||"—"}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;color:#9688A4;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #EAE0D5;font-weight:600;font-size:13px;">${email||"—"}</td></tr>
                ${notes?`<tr><td style="padding:10px 0;color:#9688A4;font-size:13px;">Notes</td><td style="padding:10px 0;font-size:13px;">${notes}</td></tr>`:""}
              </table>
              <div style="text-align:center;margin-top:28px;">
                <a href="${dashboardUrl}" style="display:inline-block;background:#C8973A;color:#fff;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:700;font-size:15px;letter-spacing:0.5px;">View in Dashboard →</a>
              </div>
              <p style="text-align:center;color:#9688A4;font-size:11px;margin-top:20px;">Click the button to confirm or decline this booking</p>
            </div>
          </div>
        `
      })
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
