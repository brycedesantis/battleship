function Ship(name, length) {
	const stats = {
		id: name,
		length: length,
		hits: [],
		sunk: false,
		direction: "horizontal",
	}

	function getDirection() {
		return stats.direction
	}

	function changeDirection() {
		stats.direction === "horizontal"
			? (stats.direction = "vertical")
			: (stats.direction = "horizontal")
	}

	function hit(amount) {
		stats.hits.push(amount)
		isSunk()
	}

	function getHits() {
		return stats.hits
	}

	function isSunk() {
		if (stats.hits.length === stats.length) {
			stats.sunk = true
			return stats.sunk
		}
	}

	return { stats, hit, getHits, isSunk, getDirection, changeDirection }
}

export default Ship
