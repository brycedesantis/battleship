const Gameboard = require("../gameboard")
const Player = require("../player")
const Ship = require("../ship")

describe("Gameboard creation", () => {
	const gameboard = Gameboard()

	test("Gameboard creates arrays and subarrays properly", () => {
		expect(gameboard.getOcean().length).toBe(10)
		expect(gameboard.getOcean()[0].length).toBe(10)
	})
})

describe("Ship placement in ocean", () => {
	const gameboard = Gameboard()
	const ship = Ship("mid", 3)

	test("Can place ship vertically using Ship factory", () => {
		ship.changeDirection()
		gameboard.placeShip(ship, 1, 2)
		expect(gameboard.atPosition(3, 2)).toHaveProperty("ship.stats.id", "mid")
	})

	test("Can place ship using Ship factory", () => {
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
		ship1.changeDirection()
		ship2.changeDirection()
		gameboard.placeShip(ship1, 1, 0)
		gameboard.placeShip(ship2, 1, 2)
		expect(gameboard.atPosition(2, 0)).toHaveProperty("ship.stats.id", "small")
		expect(gameboard.atPosition(1, 2)).toHaveProperty("ship.stats.id", "second")
	})

	describe("Placement as objects", () => {
		const gameboard = Gameboard()
		const ship1 = Ship("small", 2)
		const ship2 = Ship("second", 2)

		test("Places ship as part of an object", () => {
			gameboard.placeShip(ship1, 1, 1)
			expect(gameboard.atPosition(1, 1)).toHaveProperty(
				"ship.stats.id",
				"small"
			)
		})

		test("Place multiple ships as objects", () => {
			gameboard.placeShip(ship1, 1, 1)
			gameboard.placeShip(ship2, 2, 2)
			expect(gameboard.atPosition(1, 1)).toHaveProperty(
				"ship.stats.id",
				"small"
			)
			expect(gameboard.atPosition(2, 2)).toHaveProperty(
				"ship.stats.id",
				"second"
			)
		})
	})
})

describe("Attacking functionality", () => {
	const gameboard = Gameboard()
	const ship = Ship("small", 2)

	test("Receive attack that misses ship", () => {
		gameboard.placeShip(ship, 1, 1)
		gameboard.receiveAttack(2, 1)
		expect(gameboard.atPosition(2, 1)).toBe("miss")
	})

	test("Send coordinates of miss", () => {
		const gameboard = Gameboard()
		gameboard.placeShip(ship, 1, 1)
		expect(gameboard.receiveAttack(2, 1)).toBe((2, 1))
	})

	test("Receive attack that hits ship", () => {
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
})

describe("Sinking functionality", () => {
	const gameboard = Gameboard()
	const carrier = Ship("carrier", 5)
	const destoyer = Ship("destroyer", 2)

	test("Checks if all ships have sunk", () => {
		gameboard.placeShip(carrier, 2, 4)
		gameboard.placeShip(destoyer, 6, 6)
		expect(gameboard.allSunk()).toEqual(false)
	})

	test("Return false if only one ship has sunk", () => {
		gameboard.placeShip(carrier, 2, 4)
		gameboard.placeShip(destoyer, 6, 6)
		destoyer.hit(1)
		destoyer.hit(1)
		expect(gameboard.allSunk()).toEqual(false)
	})
})

test("Check that ship can sink from receive attack", () => {
	const gameboard = Gameboard()
	const destoyer = Ship("destroyer", 2)
	gameboard.placeShip(destoyer, 1, 1)
	gameboard.receiveAttack(1, 1)
	gameboard.receiveAttack(1, 2)
	expect(gameboard.allSunk()).toEqual(true)
})

test("Return true if all ships sunk", () => {
	const gameboard = Gameboard()
	const carrier = Ship("carrier", 5)
	const destoyer = Ship("destroyer", 2)
	gameboard.placeShip(carrier, 2, 4)
	gameboard.placeShip(destoyer, 6, 6)
	carrier.hit(1)
	carrier.hit(1)
	carrier.hit(1)
	carrier.hit(1)
	carrier.hit(1)
	destoyer.hit(1)
	destoyer.hit(1)
	expect(gameboard.allSunk()).toEqual(true)
})

test("ship can be placed from fleet", () => {
	const gameboard = Gameboard()
	const person = Player("player 1")
	gameboard.placeShip(person.fleet.Carrier, 1, 1)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "carrier")
})

test("Only one ship can be placed in a certain spot", () => {
	const gameboard = Gameboard()
	const person = Player("player 1")
	gameboard.placeShip(person.fleet.Carrier, 1, 1)
	gameboard.placeShip(person.fleet.Destroyer, 1, 1)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "carrier")
})

test("Only one ship can be placed in a certain spot when different directions", () => {
	const gameboard = Gameboard()
	const person = Player("player 1")
	gameboard.placeShip(person.fleet.Carrier, 1, 1)
	person.fleet.Destroyer.changeDirection()
	gameboard.placeShip(person.fleet.Destroyer, 1, 1)
	expect(gameboard.atPosition(1, 1)).toHaveProperty("ship.stats.id", "carrier")
})

test("Determine if all ships have been place", () => {
	const gameboard = Gameboard()
	const person = Player("player")
	gameboard.placeShip(person.fleet.Carrier, 0, 0)
	gameboard.placeShip(person.fleet.Battleship, 1, 1)
	gameboard.placeShip(person.fleet.Destroyer, 2, 2)
	gameboard.placeShip(person.fleet.Submarine, 3, 3)
	gameboard.placeShip(person.fleet.Patrol, 4, 4)
	expect(gameboard.allPlaced()).toBe(true)
})
