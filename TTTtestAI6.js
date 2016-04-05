"use strict";
console.log("Model loaded");
/**
	* Sets up the board for the game.
	* @constructor
	* @param {number} rows - The number of rows of the Model.
	* @param {number} columns - The number of columns of the Model.
*/
function Model(rows, columns) { // Constructor
	this.rows = rows;
	this.columns = columns;
	this.board = [];

	for (var i = 0; i < rows; i++) {
		var rowArray = [];
		for (var j = 0; j < columns; j++){
			rowArray.push("");
		}
		this.board.push(rowArray);
	}
	this.playerList = [];
	this.gameOver = false;
	this.changeListeners = [];
	this.newGame(this.rows, this.columns);

};

/**
	* @prototype
*/
var modelPrototype = { 
	constructor: Model,

	/**
		* Checks the given row and column to see if it is occupied by a player.
		* @function
		* @param {number} row - The row of the cell.
		* @param {number} col - The column of the cell.
	*/
	isValidMove: function(row,col){
		if (this.getPlayer(row,col) == ""){
			return true;
		} else {
			return false;
		}
	},

	/**
		* Checks the model to see if the game has ended in a draw when there are no more possible moves left.
		* @function
	*/
	isDraw: function(){
		var draw;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++){
				if ((this.board[i][j] != "") && (!this.playerWin()) && (this.numOfMoves == 9)){
					draw = true;
					this.gameOver = true;
				} else {
					draw = false;
				}
			}
		
		} 
		return draw;

	},

	/**
		* Adds a player to the playerList array.
		* @function
	*/
	addPlayer: function(str){
		this.playerList.push(str);
	},

	/**
		* Checks to see if a player has met the conditions of a win.
		* @function
	*/
	playerWin: function(){
		var winner;
		if (this.getPlayer(0,0) === this.getPlayer(0,1) && this.getPlayer(0,0) === this.getPlayer(0,2) && this.getPlayer(0,0) != ""){
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		} 
		else if (this.getPlayer(1,0) === this.getPlayer(1,1) && this.getPlayer(1,0) === this.getPlayer(1,2) && this.getPlayer(1,0) != ""){
			winner = this.getPlayer(1,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(2,0) === this.getPlayer(2,1) && this.getPlayer(2,0) === this.getPlayer(2,2) && this.getPlayer(2,0) != ""){		
			winner = this.getPlayer(2,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,0) === this.getPlayer(1,0) && this.getPlayer(0,0) === this.getPlayer(2,0) && this.getPlayer(0,0) != ""){			
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,1) === this.getPlayer(1,1) && this.getPlayer(0,1) === this.getPlayer(2,1) && this.getPlayer(0,1) != ""){
			winner = this.getPlayer(0,1);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,2) === this.getPlayer(1,2) && this.getPlayer(0,2) === this.getPlayer(2,2) && this.getPlayer(0,2) != ""){			
			winner = this.getPlayer(0,2);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,0) === this.getPlayer(1,1) && this.getPlayer(0,0) === this.getPlayer(2,2) && this.getPlayer(0,0) != ""){	
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(2,0) === this.getPlayer(1,1) && this.getPlayer(2,0) === this.getPlayer(0,2) && this.getPlayer(2,0) != ""){
			winner = this.getPlayer(2,0);
			this.gameOver = true;
			return winner;
		} 
		else {
			return "";
		}
		
	},

	/**
		* Makes the move at the give row and column if there is an empty string at that cell.
		* @function
		* @param {number} row - The row of the cell.
		* @param {number} col - The column of the cell.
	*/
	makeMove: function(row,col){
		if (this.isValidMove(row,col)){
			this.board[row][col] = this.playerList[this.currentPlayerIndex];
			this.numOfMoves += 1;
			

			for(var s=0;s< this.changeListeners.length;s++){
				var thisView = this.changeListeners[s];
				thisView.updateView(row, col, this.playerList[this.currentPlayerIndex]);
			}

			/*
			if (this.currentPlayerIndex >= this.playerList.length){ 
				this.currentPlayerIndex = 0;
			}
			*/
			this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.playerList.length;
		}
	},



	/**
		* Checks the cell and returns the string of the player.
		* @function
		* @param {number} row - The row of the cell.
		* @param {number} column - The column of the cell.
	*/
	getPlayer: function(row,col){
		return this.board[row][col];
	},

	/**
		* Resets the game model.
		* @function
		* @param {number} rows - The rows of the table.
		* @param {number} columns - The columns of the table.
	*/
	newGame: function(rows, columns) {
		this.currentPlayerIndex = 0;
		this.numOfMoves = 0;
		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < this.columns; col++) {
				this.board[row][col] = "";
			}
		}
		
	},
	/**
		* Makes a copy of the board.
		* @function
		* @param {constructor} board - the model.
	*/
	copyBoard: function(board) {
		var copy = [];
		for (var i = 0; i < board.rows; i++) {
			var rowsCopy = [];
			copy.push(rowsCopy);
			for (var j = 0; j < board.columns; j++){
				copy[i][j] = board.board[i][j];
			}
		}
		return copy;

	},

	addChangeListeners: function(f){
		this.changeListeners.push(f);
	},

	notify: function(type){
		for (var i = 0; i < this.myChangeListeners.length; i++){
			this.changeListeners[i]({change:type});
		}
	},

};

Model.prototype = modelPrototype;


/**
	* Gets the best outcome of the game. AI will either always win or tie.
	* @function
	* @param {object} board - An object that holds the board's state (which spaces are occupied, who's turn, etc.).
	* @param {boolean} isMaximizingPlayer - Is true or false depending on the turn.
*/

/**
		* Makes a copy of the model.
		* @function
		* @param {constructor} model - the model.
	*/
	function copyModel(model) {
		var copy = [];
		for (var i = 0; i < model.rows; i++) {
			var rowsCopy = [];
			copy.push(rowsCopy);
			for (var j = 0; j < model.columns; j++){
				copy[i][j] = model.board[i][j];
			}
		}
		var newModel = new Model(model.rows, model.columns);
		newModel.board = copy;
		newModel.playerList = model.playerList;
		newModel.currentPlayerIndex = model.currentPlayerIndex;
		newModel.numOfMoves = model.numOfMoves;
		newModel.changeListeners = model.changeListeners;
		return newModel;
	}

function Ai(board, isMaximizingPlayer){
	var outcome2;
	var max = -Infinity; 
	var min = Infinity;

	var outcome;
	if (board.gameOver) {
		if(board.playerWin() == board.playerList[0]){
			outcome = 1;
			return outcome;
		} else if (board.isDraw()){
			outcome = 0;
			return outcome;
		} else {
			outcome = -1;
			return outcome;
		}
	}

	for(var i = 0; i < board.rows; i++){
		for(var j = 0; j < board.columns; j++){

			var newBoard = copyModel(board);

			if(newBoard.isValidMove(i,j)){
				continue;
			}

				if(isMaximizingPlayer){

					outcome2 = Ai(newBoard, false);

					if(outcome2 > max){
						max = outcome2;
						
					}
				} else {

					outcome2 = Ai(newBoard, true);

					if(outcome2 < min){
						min = outcome2;

					}
				}
			//}
		}
	}

}

var model = new Model(3,3);
model.addPlayer("X");
model.addPlayer("O");
model.makeMove(0,1);
model.makeMove(0,0);
model.makeMove(0,2);
model.board[1][0] = "X";
model.board[1][1] = "X";
model.board[1][2] = "O";
model.board[2][2] = "X";

console.log(model.board);
console.log(model.playerWin());
console.log(model.isDraw());
console.log(model.gameOver);

console.log(Ai(model,true));