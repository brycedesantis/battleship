const Player = require("./player")
const Gameboard = require("./gameboard")

function Game() {
	const player1 = Player("player 1")
	const player2 = Player()

	const player1Board = Gameboard()
	const player2Board = Gameboard()

	return { player1, player2, player1Board, player2Board }
}

module.exports = Game
