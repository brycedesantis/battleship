function renderFunctions() {
	const tile = (y, x, square) =>
		`<div class='gamesquare ${square}' data-y=${y} data-x=${x}></div>`

	function makeBoard(target, gameboard, player) {
		target.textContent = ""

		const board = gameboard.getOcean()
		const boardLength = board.length

		let ocean = ""
		for (let i = 0; i < boardLength; i++) {
			for (let j = 0; j < boardLength; j++) {
				let square = board[i][j]
				if (square === "ocean") {
					square = "ocean"
				} else if (square.ship) {
					if (player.name !== "computer") {
						square = square.ship.stats.id
					} else {
						square = "ocean"
					}
				}
				ocean += tile(i, j, square)
			}
		}
		target.insertAdjacentHTML("afterbegin", ocean)
	}

	function renderShipYard(fleet) {
		const shipYard = document.querySelector(".ship-yard")
		for (const ship in fleet) {
			const shipDiv = document.createElement("div")
			shipDiv.className = "yard"

			let shipBlocks = ""
			for (let i = 0; i < fleet[ship].stats.length; i++) {
				shipBlocks += `
				<div class='gamesquare ${fleet[ship].stats.id}' id='yard-ships' data-index=${i}></div>
				`
			}

			shipDiv.innerHTML = `<p>${fleet[ship].stats.id}</p>
			<div class='ship'>
			${shipBlocks}
			</div>
			`
			shipYard.append(shipDiv)
		}
	}

	return {
		makeBoard,
		renderShipYard,
	}
}

export default renderFunctions
