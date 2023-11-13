const Ship = require("../ship")

test("Properly returns object", () => {
	expect(new Ship(4)).toMatchObject({
		length: 4,
		hits: [],
		sunk: false,
	})
})

test("Returns object without setting sunk", () => {
	expect(new Ship(5)).toMatchObject({
		length: 5,
		hits: [],
		sunk: false,
	})
})

test("Ship takes damage", () => {
	const ship = new Ship(4)
	ship.hit(1)
	expect(ship).toMatchObject({
		length: 4,
		hits: [1],
		sunk: false,
	})
})

test("Ship has sunk", () => {
	const ship = new Ship(3)
	ship.hit(1)
	ship.hit(1)
	ship.hit(1)
	expect(ship.isSunk()).toBe(true)
})
