module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { name, service, date, time, decision } = req.body
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const showDate = iso => {
    if (!iso) return iso
    const [y, m, d] = iso.split("-")
    return `${months[+m - 1]} ${+d}, ${y}`
  }

  const prompt = decision === "confirm"
    ? `Write a warm WhatsApp confirmation for a hair braiding salon. Client: ${name}. Service: ${service}. Date: ${showDate(date)} at ${time}. Salon: Elixir Beauty. Max 60 words. Mention coming with clean dry hair. No emojis.`
    : `Write a warm apologetic WhatsApp message declining a hair appointment. Client: ${name}. Requested: ${showDate(date)} at ${time}. Salon: Elixir Beauty. Apologize, invite them to rebook. Max 55 words. No emojis.`

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }]
      })
    })
    const data = await response.json()
    const message = data.content?.map(b => b.text || "").join("") || ""
    return res.status(200).json({ message })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
