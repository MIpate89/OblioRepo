export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const response = await fetch("https://api.oblio.eu/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + process.env.OBLIO_API_KEY, 
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
