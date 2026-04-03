module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { name, service, date, time, decision } = req.body

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const showDate = iso => {
    if (!iso) return iso
    const [y, m, d] = iso.split("-")
    return `${months[+m - 1]} ${+d}, ${y}`
  }

  const message = decision === "confirm"
    ? `Hi ${name}! Your booking for ${service} on ${showDate(date)} at ${time} has been confirmed. We look forward to seeing you at Elixir Beauty.See you soon!`
    : `Hi ${name}, unfortunately the time slot you requested on ${showDate(date)} at ${time} is not available. We apologize for the inconvenience. Please visit our booking page to choose another time. Elixir Beauty`

  return res.status(200).json({ message })
}
