exports.handler = async function(event) {
  const API_KEY = process.env.GNEWS_API_KEY;
  const query = event.queryStringParameters.q || "football";

  console.log("🔑 API Key exists?", !!API_KEY);
  console.log("📌 Query:", query);

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GNEWS_API_KEY in environment variables" })
    };
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&token=${API_KEY}`;
    console.log("🌍 Fetching:", url);

    const res = await fetch(url);
    const data = await res.json();

    console.log("📨 API Response:", JSON.stringify(data).substring(0, 200)); // only first 200 chars

    if (!data.articles) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching news", details: err.message })
    };
  }
};
