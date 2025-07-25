const gameBoard = document.getElementById('gameBoard');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const winMessage = document.getElementById('winMessage');
const score = document.getElementById('points');

let emojis = ['🐶', '🐱', '🐵', '🦁','🎃', '🧸'];
let cards = [];
let flipped = [];
let matched = 0;

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
  gameBoard.innerHTML = '';
  winMessage.textContent = '';
  startBtn.disabled = true;
  restartBtn.disabled = false;
  flipped = [];
  matched = 0;

  // Duplicate & shuffle
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

  // Create cards
  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.textContent = '';
    card.addEventListener('click', () => handleFlip(card));
    gameBoard.appendChild(card);
  });
}

function handleFlip(card) {
  if (card.classList.contains('flipped') || flipped.length === 2) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    const [first, second] = flipped;

    if (first.dataset.emoji === second.dataset.emoji) {
      flipped = [];
      matched += 1;
      score.textContent = `Score: ${matched}`
      if (matched === emojis.length) {
        winMessage.textContent = '🎉 You Win!';
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.textContent = '';
        second.textContent = '';
        flipped = [];
      }, 800);
    }
  }
}
