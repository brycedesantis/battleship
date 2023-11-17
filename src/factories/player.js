import Ship from "./ship"

function Player(type = "computer") {
	const name = type

	const fleet = {
		Carrier: Ship("carrier", 5),
		Battleship: Ship("battleship", 4),
		Destroyer: Ship("destroyer", 3),
		Submarine: Ship("submarine", 3),
		Patrol: Ship("patrol", 2),
	}

	function attack(outer, inner, board) {
		board.receiveAttack(outer, inner)
	}

	function randomAttack(board) {
		let y = Math.floor(Math.random() * 10)
		let x = Math.floor(Math.random() * 10)
		const space = board.getOcean()[y][x]
		if (space === "miss" || space === "hit") {
			randomAttack(board)
		} else {
			board.receiveAttack(y, x)
		}
	}

	return { name, fleet, attack, randomAttack }
}

export default Player
