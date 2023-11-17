const Ship = (name, length) => {
	const stats = {
		id: name,
		length: length,
		hits: [],
		sunk: false,
	}

	let direction = "horizontal"

	function getDirection() {
		return direction
	}

	function changeDirection() {
		direction === "horizontal"
			? (direction = "vertical")
			: (direction = "horizontal")
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
