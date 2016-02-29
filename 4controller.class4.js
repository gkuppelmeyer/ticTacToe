function tttController(callback){
	var gameData = new Model(3,3);
	var gameView = new View(gameData, function(tdElement, gameData.rows, gameData.columns) {
		for (var r = 0; r < model.rows; r++) {
			for (var c = 0; c < model.columns; c++) {
				var modelTr = document.getElementsByTagName("tr")[r];
				var tdElement = tableCellRow.getElementsByTagName("td")[c];
				tdElement.addEventListener("click", function() {
					setCellText(currentModel.rows, currentModel.columns, getPlayer(currentModel.rows, currentModel.columns));
				}
			}
		}
	});


	callback(tdElement, gameData.rows, gameData.columns) {
		tdElement.addEventListener("click", function() {
			gameData.makeMove(gameData.rows,gameData.columns)
		})
	};
}s