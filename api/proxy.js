export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.oblio.eu/1.0/proforma/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(
          process.env.OBLIO_USER + ":" + process.env.OBLIO_PASS
        ).toString("base64")}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
