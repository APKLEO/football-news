const newsContainer = document.getElementById("news-list");
const searchInput = document.getElementById("news-search");

function fetchNews(query = "football") {
  fetch(`/.netlify/functions/news?q=${query}`)
    .then(res => res.json())
    .then(data => {
      newsContainer.innerHTML = "";
      if (!data.articles || data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No news found.</p>";
        return;
      }
      data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <img src="${article.image || 'https://via.placeholder.com/300'}" alt="news">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(card);
      });
    })
    .catch(err => {
      newsContainer.innerHTML = "Error loading news.";
      console.error(err);
    });
}

function searchNews() {
  const query = searchInput.value.trim();
  fetchNews(query || "football");
}

// Load default football news on page load
fetchNews("football");
