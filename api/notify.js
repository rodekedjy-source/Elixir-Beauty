
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, service, date, time, notes } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const OWNER_EMAIL    = process.env.OWNER_EMAIL;

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const displayDate = (iso) => {
    if (!iso) return iso;
    const [y, m, d] = iso.split("-");
    return `${months[+m - 1]} ${+d}, ${y}`;
  };

  const html = `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #FDF8F2; border-radius: 16px; border: 1px solid #EAE0D5;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="font-size: 28px; color: #1C0F2E; margin: 0;">Elixir Beauty</h1>
        <p style="color: #9688A4; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">New Reservation Request</p>
      </div>
      <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #EAE0D5; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #9688A4; font-size: 13px; width: 40%;">Client</td><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; font-weight: 600; color: #1C0F2E;">${name}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #9688A4; font-size: 13px;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #1C0F2E;">${service}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #9688A4; font-size: 13px;">Date</td><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #1C0F2E;">${displayDate(date)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #9688A4; font-size: 13px;">Time</td><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #1C0F2E;">${time}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #9688A4; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #EAE0D5; color: #1C0F2E;">${phone || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #9688A4; font-size: 13px;">Email</td><td style="padding: 10px 0; color: #1C0F2E;">${email || "—"}</td></tr>
          ${notes ? `<tr><td style="padding: 10px 0; color: #9688A4; font-size: 13px; border-top: 1px solid #EAE0D5;">Notes</td><td style="padding: 10px 0; color: #1C0F2E; border-top: 1px solid #EAE0D5;">${notes}</td></tr>` : ""}
        </table>
      </div>
      <div style="text-align: center;">
        <a href="https://elixir-beauty.vercel.app" style="display: inline-block; background: #C8973A; color: white; padding: 13px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Open Dashboard →
        </a>
      </div>
      <p style="text-align: center; color: #9688A4; font-size: 11px; margin-top: 24px;">Elixir Beauty · Montreal, Canada</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Elixir Beauty <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `🌿 New booking — ${name} · ${service}`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
