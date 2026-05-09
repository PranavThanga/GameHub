fetch('games.json')
  .then(res => res.json())
  .then(games => {
    const grid = document.getElementById('game-grid');

    games.forEach(game => {
      const card = document.createElement('a');
      card.href = game.url;
      card.className = 'game-card';

      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.name}">
        <div class="overlay">
          <span>${game.name}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('game-grid').innerHTML = '<p>Could not load games.</p>';
    console.error('Failed to load games.json:', err);
  });