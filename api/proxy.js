export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { endpoint, data } = req.body;

    const response = await fetch(`https://api.oblio.eu/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + process.env.OBLIO_API_KEY,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
