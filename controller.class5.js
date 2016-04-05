
	var gameData = new Model(3,3);
	gameData.addPlayer("X");
	gameData.addPlayer("O");
	var gameView = new View(gameData, function(tdElement, row, column) {
		tdElement.addEventListener("click", function() {
			gameData.makeMove(row,column);
			if (gameData.playerWin() !== ""){
				alert(gameData.playerWin() + " wins!");
			}
			if (gameData.isDraw() && gameData.numOfMoves == 9){
				alert("No one wins!");
			}
		
		})
	});
	gameData.addChangeListeners(gameView);
	
