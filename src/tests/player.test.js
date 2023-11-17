import Player from "../factories/player"
import Gameboard from "../factories/gameboard"

describe("Player functions", () => {
	const person = Player("player 1")
	const computer = Player()
	const home = Gameboard()
	const enemy = Gameboard()

	test("Player type", () => {
		expect(person.name).toBe("player 1")
	})

	test("Computer type", () => {
		expect(computer.name).toBe("computer")
	})

	test("Player can attack", () => {
		person.attack(1, 1, enemy)
		expect(enemy.atPosition(1, 1)).toBe("miss")
	})

	test("Computer can attack", () => {
		computer.randomAttack(home)
		expect(home.getOcean()).not.toBe("ocean")
	})

	test("Player to access fleet", () => {
		expect(person.fleet.Carrier).toHaveProperty("stats.id", "carrier")
	})
})
