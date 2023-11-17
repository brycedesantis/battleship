import Game from "../factories/game"

describe("Game Functionality", () => {
	const game = Game()
	test("Creates seperate players", () => {
		expect(game.player1.name).toBe("player 1")
		expect(game.player2.name).toBe("computer")
	})

	test("Gameboards exist in Game", () => {
		const testing = game.player1Board.getOcean().length
		const second = game.player1Board.getOcean()[0].length
		expect(testing).toBe(10)
		expect(second).toBe(10)
	})
})
