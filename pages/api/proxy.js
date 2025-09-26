export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { endpoint, data } = req.body;
  const apiKey = process.env.OBLIO_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing OBLIO_API_KEY in environment variables" });
  }

  try {
    const response = await fetch(`https://api.oblio.eu/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + apiKey,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
