const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const nameX = document.getElementById('name-x');
const nameO = document.getElementById('name-o');
const startBtn = document.getElementById('start-btn');
const labelX = document.getElementById('label-x');
const labelO = document.getElementById('label-o');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const nameInputs = document.getElementById('name-inputs');

let scores = { X: 0, O: 0 };
let playerNames = { X: 'X', O: 'O' };
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (!checkWin() && !checkDraw()) {
    switchPlayer();
  }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

const winConditions = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;

    if (board[a] === currentPlayer &&
        board[b] === currentPlayer &&
        board[c] === currentPlayer) {

      condition.forEach(i => cells[i].classList.add('winner'));
      scores[currentPlayer]++;
      scoreX.textContent = scores.X;
      scoreO.textContent = scores.O;
      status.textContent = `${playerNames[currentPlayer]} wins! 🎉`;
      gameActive = false;
      return true;
    }
  }
  return false;
}

function checkDraw() {
  if (board.every(cell => cell !== '')) {
    status.textContent = "It's a draw! 🤝";
    gameActive = false;
    return true;
  }
  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${playerNames[currentPlayer]}'s turn`;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `${playerNames.X}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winner');
  });

  status.textContent = `${playerNames.X}'s turn`;
  gameActive = true;
}

resetBtn.addEventListener('click', resetGame);

function startGame() {
  playerNames.X = nameX.value.trim() || 'X';
  playerNames.O = nameO.value.trim() || 'O';

  nameInputs.style.display = 'none';
  status.textContent = `${playerNames.X}'s turn`;
  gameActive = true;
}

startBtn.addEventListener('click', startGame);