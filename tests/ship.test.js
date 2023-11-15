const Ship = require("../ship")

test("Properly returns object", () => {
	let ship = Ship(4)
	expect(ship.stats).toMatchObject({
		length: 4,
		hits: [],
		sunk: false,
	})
})

test("Returns object without setting sunk", () => {
	let ship = Ship(5)
	expect(ship.stats).toMatchObject({
		length: 5,
		hits: [],
		sunk: false,
	})
})

test("Ship takes damage", () => {
	const ship = Ship(4)
	ship.hit(1)
	expect(ship.stats).toMatchObject({
		length: 4,
		hits: [1],
		sunk: false,
	})
})

test("Ship has sunk", () => {
	const ship = Ship(3)
	ship.hit(1)
	ship.hit(1)
	ship.hit(1)
	expect(ship.isSunk()).toBe(true)
})
test("Get hits returns array", () => {
	const ship = Ship(4)
	ship.hit(1)
	ship.hit(1)
	expect(ship.getHits()).toEqual([1, 1])
})
