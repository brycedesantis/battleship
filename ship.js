class Ship {
	constructor(length) {
		this.length = length
		this.hits = []
		this.sunk = false
	}

	hit(amount) {
		this.hits.push(amount)
	}

	isSunk() {
		if (this.hits.length === this.length) {
			this.sunk = true
			return this.sunk
		}
	}
}

module.exports = Ship
