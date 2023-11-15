import Ship from "./ship"

const Gameboard = () => {
	const oceanTiles = Array(10)
		.fill("ocean")
		.map(() => Array(10).fill("ocean"))

	function atPosition(outer, inner) {
		return oceanTiles[outer][inner]
	}

	function placeShip(ship, outer, inner, vertical) {
		const tiles = oceanTiles
		for (let i = 0; i < ship.stats.length; i++) {
			if (vertical) {
				tiles[outer + i][inner] = { ship, index: i }
			} else {
				tiles[outer][inner + i] = { ship, index: i }
			}
		}
	}

	function receiveAttack(outer, inner) {
		if (oceanTiles[outer][inner] === "ocean") {
			oceanTiles[outer][inner] = "miss"
			return outer, inner
		} else if (oceanTiles[outer][inner].ship) {
			oceanTiles[outer][inner].ship.hit(oceanTiles[outer][inner].index)
			oceanTiles[outer][inner] = "hit"
		}

		return oceanTiles[outer][inner]
	}

	return {
		oceanTiles,
		atPosition,
		placeShip,
		receiveAttack,
	}
}

module.exports = Gameboard
