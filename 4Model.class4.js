"use strict";

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
		rowArray = [];
		for (var j = 0; j < columns; j++){
			rowArray.push("");
		}
		this.board.push(rowArray);
	}

	this.currentPlayerIndex = 0;
	this.playerList = [];
	newGame(this.rows, this.columns);
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
		return getPlayer(row,col);
	},

	/**
		* Checks the model to see if the game has ended in a draw when there are no more possible moves left.
		* @function
	*/
	isDraw: function(){
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++){
				if ((this.board[i][j] != "") && (!playerWin())){
					return true;
				}
			}
		
		}

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
		if (getPlayer(0,0) == getPlayer(0,1) && getPlayer(0,0) == getPlayer(0,2)){
			var winner = getPlayer(0,0);
			return winner;
		}
		else if (getPlayer(1,0) == getPlayer(1,1) && getPlayer(1,0) == getPlayer(1,2)){
			var winner = getPlayer(1,0);
			return winner;
		}
		else if (getPlayer(2,0) == getPlayer(2,1) && getPlayer(2,0) == getPlayer(2,2)){
			var winner = getPlayer(2,0);
			return winner;
		}
		else if (getPlayer(0,0) == getPlayer(1,0) && getPlayer(0,0) == getPlayer(2,0)){
			var winner = getPlayer(0,0);
			return winner;
		}
		else if (getPlayer(0,1) == getPlayer(1,1) && getPlayer(0,1) == getPlayer(2,1)){
			var winner = getPlayer(0,1);
			return winner;
		}
		else if (getPlayer(0,2) == getPlayer(1,2) && getPlayer(0,2) == getPlayer(2,2)){
			var winner = getPlayer(0,2);
			return winner;
		}
		else if (getPlayer(0,0) == getPlayer(1,1) && getPlayer(0,0) == getPlayer(2,2)){
			var winner = getPlayer(0,0);
			return winner;
		}
		else if (getPlayer(2,0) == getPlayer(1,1) && getPlayer(2,0) == getPlayer(0,2)){
			var winner = getPlayer(2,0);
			return winner;
		} else {
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
		if (isValidMove(row,col)){
			this.board[row][col] = this.playerList[this.currentPlayerIndex];
			this.currentPlayerIndex +=1; 
			if (this.currentPlayerIndex >= this.playerList.length){ 
				this.currentPlayerIndex = 0;
			}
		}
	},

	/**
		* Checks the cell and returns the string of the player.
		* @function
		* @param {number} row - The row of the cell.
		* @param {number} column - The column of the cell.
	*/
	getPlayer: function(row,col){
		var position = this.board[row][col];
		return position;
	},

	/**
		* Resets the game model.
		* @function
		* @param {number} rows - The rows of the table.
		* @param {number} columns - The columns of the table.
	*/
	newGame: function(rows, columns) {
		this.currentPlayerIndex = 0;
		this.playerList = [];
		for (var row = 0; row < this.rows; i++) {
			for (var col = 0; col < this.columns; i++) {
				this.board[row][col] = "";
			};
		}
		
	},

};

Model.prototype = modelPrototype;

