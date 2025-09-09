const fixturesContainer = document.getElementById("fixtures-list");
const fixtureSearch = document.getElementById("fixture-search");
let allMatches = [];

function fetchFixtures() {
  fetch("/.netlify/functions/fixtures")
    .then(res => res.json())
    .then(data => {
      allMatches = data.matches;
      displayFixtures(allMatches);
    })
    .catch(err => {
      fixturesContainer.innerHTML = "Error loading fixtures.";
      console.error(err);
    });
}

function displayFixtures(matches) {
  fixturesContainer.innerHTML = "";
  if (!matches || matches.length === 0) {
    fixturesContainer.innerHTML = "<p>No fixtures found.</p>";
    return;
  }
  matches.slice(0, 10).forEach(match => {
    const card = document.createElement("div");
    card.className = "fixture-card";
    card.innerHTML = `
      <h3>${match.competition.name}</h3>
      <p>${match.homeTeam.name} vs ${match.awayTeam.name}</p>
      <p><strong>${match.utcDate.slice(0, 10)} ${match.utcDate.slice(11,16)}</strong></p>
    `;
    fixturesContainer.appendChild(card);
  });
}

function searchFixtures() {
  const query = fixtureSearch.value.toLowerCase();
  const filtered = allMatches.filter(
    m => m.homeTeam.name.toLowerCase().includes(query) ||
         m.awayTeam.name.toLowerCase().includes(query)
  );
  displayFixtures(filtered);
}

// Load fixtures on page load
fetchFixtures();
