import Player from "./player"
import Gameboard from "./gameboard"

function Game() {
	const player1 = Player("player 1")
	const player2 = Player()

	const player1Board = Gameboard()
	const player2Board = Gameboard()

	const p1B = document.querySelector(".player-grid")
	const cpu = document.querySelector(".computer-grid")

	function renderBoard() {
		makeBoard(p1B, player1Board)
		makeBoard(cpu, player1Board)
	}

	function makeBoard(target, gameboard) {
		const board = gameboard.getOcean()
		const boardLength = board.length

		for (let i = 0; i < boardLength; i++) {
			for (let j = 0; j < boardLength; j++) {
				const div = document.createElement("div")
				// div.textContent = board[i][j]
				div.className = "gamespace"
				div.id = `position-${i}-${j}`
				target.append(div)
			}
		}
	}

	return { player1, player2, player1Board, player2Board, renderBoard }
}

export default Game
