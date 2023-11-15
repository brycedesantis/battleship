const Ship = (name, length) => {
	const stats = {
		id: name,
		length: length,
		hits: [],
		sunk: false,
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

	return { stats, hit, getHits, isSunk }
}

module.exports = Ship
