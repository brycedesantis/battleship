import Player from "./player"
import Ship from "./ship"

const Gameboard = () => {
	const oceanTiles = Array(10)
		.fill("ocean")
		.map(() => Array(10).fill("ocean"))

	let deployedShips = []

	function getOcean() {
		return oceanTiles
	}

	function atPosition(outer, inner) {
		return oceanTiles[outer][inner]
	}

	function orientation(outer, inner, increment, direction) {
		let y = outer
		let x = inner + increment

		if (direction === "vertical") {
			y = outer + increment
			x = inner
		}

		return [y, x]
	}

	function validPlacement(outer, inner, length, direction) {
		const open = []
		for (let i = 0; i < length; i++) {
			const [y, x] = orientation(outer, inner, i, direction)

			if (y < 10 && x < 10) {
				open.push(oceanTiles[y][x])
			} else {
				return false
			}
		}
		return open.every((space) => space === "ocean")
	}

	function placeShip(ship, outer, inner) {
		const tiles = oceanTiles
		const direction = ship.getDirection()

		const valid = validPlacement(outer, inner, ship.stats.length, direction)
		if (valid) {
			for (let i = 0; i < ship.stats.length; i++) {
				const [y, x] = orientation(outer, inner, i, direction)
				tiles[y][x] = { ship, index: i }
			}
			deployedShips.push(ship)
			return valid
		} else {
			return valid
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

	function allSunk() {
		return deployedShips.every((ship) => ship.isSunk())
	}

	function allPlaced() {
		return deployedShips.length === Object.keys(Player().fleet).length
	}

	return {
		oceanTiles,
		getOcean,
		atPosition,
		placeShip,
		receiveAttack,
		allSunk,
		allPlaced,
	}
}

export default Gameboard
