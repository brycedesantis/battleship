const Ship = require("./ship")

const Player = (type = "computer") => {
	const name = type

	const fleet = {
		Carrier: Ship("carrier", 5),
		Battleship: Ship("battleship", 4),
		Destroyer: Ship("destroyer", 3),
		Submarine: Ship("submarine", 3),
		Patrol: Ship("patrol boat", 2),
	}

	function attack(outer, inner, board) {
		board.receiveAttack(outer, inner)
	}

	function randomAttack(board) {
		let randomNum = Math.floor(Math.random() * 10)
		board.receiveAttack(randomNum, randomNum)
	}

	return { name, fleet, attack, randomAttack }
}

module.exports = Player
