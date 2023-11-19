import Player from "./player"
import Gameboard from "./gameboard"
import renderFunctions from "../render/render"

function Game() {
	const player1 = Player("player 1")
	const player2 = Player()

	const player1Board = Gameboard()
	const player2Board = Gameboard()

	const p1B = document.querySelector(".player-grid")
	const cpu = document.querySelector(".computer-grid")

	function renderBoard() {
		renderFunctions().makeBoard(p1B, player1Board, player1.fleet)
		renderFunctions().makeBoard(cpu, player2Board, player2.fleet)
	}

	function renderShipYard() {
		renderFunctions().renderShipYard(player1.fleet)
	}

	function autoPlace() {
		player1Board.resetOcean()
		player2Board.resetOcean()
		player1Board.autoPlaceFleet(player1.fleet)
		player2Board.autoPlaceFleet(player2.fleet)
		renderBoard()
	}

	function attackBoard(click) {
		let tile = click.target
		// player1.attack(tile.dataset.y, tile.dataset.x, player2Board)
		if (tile.classList.contains("gamesquare")) {
			const y = tile.dataset.y
			const x = tile.dataset.x

			const oceanTile = player2Board.getOcean()[y][x]
			if (oceanTile !== "miss" && oceanTile !== "hit") {
				player1.attack(y, x, player2Board)
				player2.randomAttack(player1Board)
				renderBoard()
			}

			if (player2Board.allSunk() || player1Board.allSunk()) {
				let winner = player2Board.allSunk() ? player1.name : player2.name
				const gameOverScreen = document.querySelector(".game-over-screen")
				const endScreen = document.querySelector(".end-screen")
				const main = document.querySelector(".main")
				main.classList.add("blur")
				gameOverScreen.style.display = "flex"
				endScreen.innerHTML = `
				<h1>GAME OVER</h1>
				<h3>${winner} WINS!</h3>
				`
			}
		}
	}

	function clickEvents() {
		cpu.addEventListener("click", attackBoard)
	}

	return {
		player1,
		player2,
		player1Board,
		player2Board,
		renderBoard,
		autoPlace,
		clickEvents,
		renderShipYard,
	}
}

export default Game
