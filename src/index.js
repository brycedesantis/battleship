import Game from "./factories/game"
import "./style.css"

const game = Game()

game.autoPlace()

game.clickEvents()

game.renderShipYard()
