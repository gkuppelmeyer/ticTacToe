function View(model, callback){
	callback(tdElement, model.rows, model.columns)
};



function updateView(model){
	for (var r = 0; r < model.rows; r++) {
		for (var c = 0; c < model.columns; c++) {
			setCellText(r, c, model.getPlayer(r,c));
		}
	}
}