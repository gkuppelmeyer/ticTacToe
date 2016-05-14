function createTable(rows,columns){

	var table = document.createElement("table");

	for(i = 0; i < rows; i++){
		var tableRow = table.appendChild(document.createElement("tr"));

		for(j = 0; j < columns; j++){
			var tableCell = tableRow.appendChild(document.createElement("td"));
			tableCell.className = "game-grid-cell";
			
			tableCell.appendChild(document.createTextNode("X"));
			
			/*
			tableCell.style.textAlign = "center";
			tableCell.style.width = "50px";
			tableCell.style.height = "50px";
			tableCell.style.fontFamily = "verdana, sans-serif";
			tableCell.style.backgroundColor = "#ddd";
			tableCell.style.border = "1px solid";
			*/
		}
	}


	table.className = "game-grid-view";
	var game = document.getElementById("ttt");
	game.appendChild(table);

}

function setCellText(row, col, str){
	var tableCellRow = document.getElementsByTagName("tr")[row];
	var tableCell = tableCellRow.getElementsByTagName("td")[col];
	tableCell.textContent = str;
}