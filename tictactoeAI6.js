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
	this.currentPlayerIndex = 0;
	this.numOfMoves = 0;

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
		var newGame = new Model(rows, columns);
	},

	/**
		* Makes a copy of the model and board.
		* @function
		* @param {constructor} board - the model.
	*/
	copyModel: function(model) {
		
		function copyBoard(model) {
			var copy = [];
			for (var i = 0; i < model.rows; i++) {
				var rowsCopy = [];
				copy.push(rowsCopy);
				for (var j = 0; j < model.columns; j++){
					copy[i][j] = model.board[i][j];
				}
			}
			return copy;

		}
		
		var newModel = new Model(model.rows, model.columns);
		newModel.board = copyBoard(model);
		newModel.playerList = model.playerList;
		newModel.gameOver = model.gameOver;
		newModel.changeListeners = model.changeListeners;
		newModel.currentPlayerIndex = model.currentPlayerIndex;
		newModel.numOfMoves = model.numOfMoves;
		return newModel;
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




function gameState(boardPosition){
	var outcome;
	if(boardPosition.isDraw()){
		outcome = 0;
		return outcome;
	} 
	if (!boardPosition.playerWin() === "") {
		if(boardPosition.playerWin() === boardPosition.playerList[0]){
		outcome = 1;
			return outcome;
		} else {
			outcome = -1;
			return outcome;
		}
	}
	return false;
	
}

/**
	* Gets the best outcome of the game. AI will either always win or tie.
	* @function
	* @param {object} boardPosition - An object that holds the board's state (which spaces are occupied, who's turn, etc.).
	* @param {boolean} isMaximizingPlayer - Is true or false depending on the turn.
*/



function getBestOutcome(boardPosition, isMaximizingPlayer){
	var recurOutcome;
	var min = Infinity;
	var max = -Infinity;


	/**
		* Base Case
	*/

	if(gameState(boardPosition) !== false){
		return gameState(boardPosition);
	}

	/**
		* Makes a copy of the board object
	*/

    for (var i = 0; i < boardPosition.rows; i++) {
    	for (var j = 0; j < boardPosition.columns; j++) {
    		if (boardPosition.isValidMove(i,j)){
    			var m = boardPosition.copyModel(boardPosition);
    			
    			

    			if (isMaximizingPlayer = true)  {
    				recurOutcome = getBestOutcome(m.board, false);
    				if(recurOutcome > max){
    					max = recurOutcome;
    				}

    			} else {
    				recurOutcome = getBestOutcome(m.board, true);
    				if(recurOutcome < min){
    					min = recurOutcome;
    				}
    			}
    		}		
    	}
	}
}

var mod = new Model(3,3);
mod.addPlayer("X");
mod.addPlayer("O");
console.log(mod.board);
console.log(mod.gameOver);
console.log(mod.playerWin());
console.log(mod.isDraw());
console.log(getBestOutcome(mod,true));
