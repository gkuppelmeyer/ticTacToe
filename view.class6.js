function View(model, callback){
	var table = document.createElement("table");
	for(i = 0; i < model.rows; i++){
		var tableRow = table.appendChild(document.createElement("tr"));
		for(j = 0; j < model.columns; j++){
			var tableCell = tableRow.appendChild(document.createElement("td"));
			tableCell.className = "game-grid-cell";
			callback(tableCell, i, j);
		}
	}
	table.className = "game-grid-view";
	var game = document.getElementById("ttt");
	game.appendChild(table);
	console.log("View loaded");
};




View.prototype.updateView = function(row, col, str){
	setCellText(row, col, str);
}
