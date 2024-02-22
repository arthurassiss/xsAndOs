const containerGame = document.getElementById('containerGame');
const containerEnter = document.getElementById('containerEnter');
const team1 = document.getElementById('btn1');
const team2 = document.getElementById('btn2');
const squares = document.querySelectorAll('.square');
const h1 = document.createElement('h1');
let currentPlayer = '';
let gameState = ['', '', '', '', '', '', '', '', ''];

h1.style.display = 'hidden';
h1.classList = 'message';

function openGame() {
	containerGame.style.display = 'block';
	containerEnter.style.display = 'none';

	if (this === team1) {
		currentPlayer = 'X';
	} else if (this === team2) {
		currentPlayer = 'O';
	}

	squares.forEach(square =>
		square.addEventListener('click', handleSquareClick),
	);
}

function handleSquareClick() {
	const index = [...squares].indexOf(this);

	if (gameState[index] === '') {
		gameState[index] = currentPlayer;
		this.textContent = currentPlayer;
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

		const winner = checkWinner();
		if (winner) {
			containerGame.style.display = 'none';
			h1.style.display = 'block';
			h1.classList.add = 'message';
			let text = document.createTextNode(`O jogador ${winner} ganhou!`);
			h1.appendChild(text);
			document.body.appendChild(h1);
		}
	}
}

function restart() {
	containerGame.style.display = 'none';
	containerEnter.style.display = 'flex';
	h1.innerHTML = '';
	gameState = ['', '', '', '', '', '', '', '', ''];
	squares.forEach(square => {
		square.innerHTML = '';
	});
}

function checkWinner() {
	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let combo of winningConditions) {
		const [a, b, c] = combo;
		if (
			gameState[a] &&
			gameState[a] === gameState[b] &&
			gameState[a] === gameState[c]
		) {
			return gameState[a];
		}
	}

	if (gameState.every(square => square !== '')) {
		containerGame.style.display = 'none';
		h1.style.display = 'block';
		h1.classList.add = 'message';
		let text = document.createTextNode('Empate, que jogo chatoooo!');
		h1.appendChild(text);
		document.body.appendChild(h1);
	}
}

team1.addEventListener('click', openGame);
team2.addEventListener('click', openGame);
