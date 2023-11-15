const Gameboard = require("../gameboard")
const Ship = require("../ship")

test("Gameboard creates arrays and subarrays properly", () => {
	const gameboard = Gameboard()
	expect(gameboard.tileSet).toEqual([
		["ocean", "ocean"],
		["ocean", "ocean"],
	])
})

test.skip("Relays coordinates", () => {
	const gameboard = Gameboard()
	gameboard.placeShip({ length: 2 }, 2, 2)
	expect(gameboard.tileSet).toEqual([
		["ocean", "ocean", "ocean", "ocean"],
		["ocean", "ocean", "ocean", "ocean"],
		["ocean", "ocean", "ship", "ship"],
		["ocean", "ocean", "ocean", "ocean"],
	])
})

test.skip("Ships can be placed vertically", () => {
	const gameboard = Gameboard()
	gameboard.placeShip({ length: 2 }, 2, 2, true)
	expect(gameboard.tileSet).toEqual([
		["ocean", "ocean", "ocean", "ocean"],
		["ocean", "ocean", "ocean", "ocean"],
		["ocean", "ocean", ship, "ocean"],
		["ocean", "ocean", ship, "ocean"],
	])
})

test("Can place ship vertically using Ship factory", () => {
	const gameboard = Gameboard()
	const ship = Ship("mid", 3)
	gameboard.placeShip(ship, 1, 2, true)
	expect(gameboard.atPosition(3, 2)).toHaveProperty("ship.stats.id", "mid")
})

test("Can place ship using Ship factory", () => {
	const gameboard = Gameboard()
	const ship = Ship("mid", 3)
	gameboard.placeShip(ship, 1, 1)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "mid")
})

test("Place multiple ships", () => {
	const gameboard = Gameboard()
	const ship1 = Ship("small", 2)
	const ship2 = Ship("second", 2)
	gameboard.placeShip(ship1, 1, 1)
	gameboard.placeShip(ship2, 2, 2)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "small")
	expect(gameboard.atPosition(2, 2)).toHaveProperty("ship.stats.id", "second")
})

test("Place multiple ships vertically", () => {
	const gameboard = Gameboard()
	const ship1 = Ship("small", 2)
	const ship2 = Ship("second", 2)
	gameboard.placeShip(ship1, 1, 0, true)
	gameboard.placeShip(ship2, 1, 2, true)
	expect(gameboard.atPosition(2, 0)).toHaveProperty("ship.stats.id", "small")
	expect(gameboard.atPosition(1, 2)).toHaveProperty("ship.stats.id", "second")
})

test("Places ship as part of an object", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)
	gameboard.placeShip(ship, 1, 1)
	expect(gameboard.atPosition(1, 1)).toBe(ship)
})

test("Place multiple ships as objects", () => {
	const gameboard = Gameboard()
	const ship1 = Ship("small", 2)
	const ship2 = Ship("second", 2)
	gameboard.placeShip(ship1, 1, 1)
	gameboard.placeShip(ship2, 2, 2)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "small")
	expect(gameboard.atPosition(2, 2)).toHaveProperty("ship.stats.id", "second")
})

test("Receive attack that misses ship", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)
	gameboard.placeShip(ship, 1, 1)
	gameboard.receiveAttack(2, 1)
	expect(gameboard.atPosition(2, 1)).toBe("miss")
})

test("Send coordinates of miss", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)
	gameboard.placeShip(ship, 1, 1)
	expect(gameboard.receiveAttack(2, 1)).toBe((2, 1))
})

test("Receive attack that hits ship", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)
	gameboard.placeShip(ship, 1, 1)
	gameboard.receiveAttack(1, 1)
	gameboard.receiveAttack(1, 2)
	expect(ship.getHits()).toEqual([0, 1])
})

test("Attack sinks ship", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)
	gameboard.placeShip(ship, 1, 1)
	gameboard.receiveAttack(1, 1)
	gameboard.receiveAttack(1, 2)
	expect(ship.isSunk()).toBe(true)
})
