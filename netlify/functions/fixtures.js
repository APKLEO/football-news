const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const API_KEY = process.env.FOOTBALLDATA_KEY;

  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Error fetching fixtures" };
  }
};
