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

}

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
		if (this.getPlayer(row,col) === ""){
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
		if (this.getPlayer(0,0) === this.getPlayer(0,1) && this.getPlayer(0,0) === this.getPlayer(0,2) && this.getPlayer(0,0) !== ""){
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		} 
		else if (this.getPlayer(1,0) === this.getPlayer(1,1) && this.getPlayer(1,0) === this.getPlayer(1,2) && this.getPlayer(1,0) !== ""){
			winner = this.getPlayer(1,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(2,0) === this.getPlayer(2,1) && this.getPlayer(2,0) === this.getPlayer(2,2) && this.getPlayer(2,0) !== ""){		
			winner = this.getPlayer(2,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,0) === this.getPlayer(1,0) && this.getPlayer(0,0) === this.getPlayer(2,0) && this.getPlayer(0,0) !== ""){			
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,1) === this.getPlayer(1,1) && this.getPlayer(0,1) === this.getPlayer(2,1) && this.getPlayer(0,1) !== ""){
			winner = this.getPlayer(0,1);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,2) === this.getPlayer(1,2) && this.getPlayer(0,2) === this.getPlayer(2,2) && this.getPlayer(0,2) != ""){			
			winner = this.getPlayer(0,2);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(0,0) === this.getPlayer(1,1) && this.getPlayer(0,0) === this.getPlayer(2,2) && this.getPlayer(0,0) !== ""){	
			winner = this.getPlayer(0,0);
			this.gameOver = true;
			return winner;
		}
		else if (this.getPlayer(2,0) === this.getPlayer(1,1) && this.getPlayer(2,0) === this.getPlayer(0,2) && this.getPlayer(2,0) !== ""){
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
		* Makes a copy of the model and board.
		* @function
		* @param {constructor} board - the model.
	*/
	function copyModel(model) {
		
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
	}


function gameState(boardPosition){
	if(boardPosition.isDraw()){
		return {
			row: -1,
			col: -1,
			val: 0
		};
	} 
	else if ((boardPosition.playerWin()) != "") {
		if(boardPosition.playerWin() === boardPosition.playerList[0]){
			return {
				row: -1,
				col: -1,
				val: 1
			};
		} else {
			return {
				row: -1,
				col: -1,
				val: -1
			};
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
	
	var min = {
		row: null,
		col: null,
		val: Infinity
	};
	var max = {
		row: null,
		col: null,
		val: -Infinity
	}

	/**
		* Base Case
	*/

	if(gameState(boardPosition) !== false){
		return gameState(boardPosition);
	}

    for (var i = 0; i < boardPosition.rows; i++) {
    	for (var j = 0; j < boardPosition.columns; j++) {
    		if (boardPosition.isValidMove(i,j)){
    			var m = copyModel(boardPosition);
    			m.makeMove(i,j);
    			//console.log(boardPosition.board);
    			if (isMaximizingPlayer)  {

    				recurOutcome = getBestOutcome(m, false);
    				if(recurOutcome.val > max.val){
    					max.val = recurOutcome.val;
    					max.row = i;
    					max.col = j;
    					//console.log(max);
    				}

    			} else {

    				recurOutcome = getBestOutcome(m, true);
    				if(recurOutcome.val < min.val){
    					min.val = recurOutcome.val;
						min.row = i;
						min.col = j;
						//console.log(min);
    				}
    			}
    		}		
    	}
	}
	return isMaximizingPlayer ? max:min;
}

var mod = new Model(3,3);
mod.addPlayer("X");
mod.addPlayer("O");
/*
mod.board[0][0] = "X";
mod.board[0][1] = "";
mod.board[0][2] = "X";
mod.board[1][0] = "";
mod.board[1][1] = "";
mod.board[1][2] = "";
mod.board[2][0] = "X";
mod.board[2][1] = "O";
mod.board[2][2] = "O";
mod.numOfMoves = 5;


console.log(mod.board);
console.log(mod.playerWin());
console.log(mod.isDraw());

*/
/*
var Xmove1 = getBestOutcome(mod,true);
mod.makeMove(Xmove1.row, Xmove1.col);
console.log(mod.board);

var Omove1 = getBestOutcome(mod,false);
mod.makeMove(Omove1.row, Omove1.col);
console.log(mod.board);

var Xmove2 = getBestOutcome(mod,true);
mod.makeMove(Xmove2.row, Xmove2.col);
console.log(mod.board);

var Omove2 = getBestOutcome(mod,false);
mod.makeMove(Omove2.row, Omove2.col);
console.log(mod.board);

var Xmove3 = getBestOutcome(mod,true);
mod.makeMove(Xmove3.row, Xmove3.col);
console.log(mod.board);

var Omove3 = getBestOutcome(mod,false);
mod.makeMove(Omove3.row, Omove3.col);
console.log(mod.board);

var Xmove4 = getBestOutcome(mod,true);
mod.makeMove(Xmove4.row, Xmove4.col);
console.log(mod.board);

var Omove4 = getBestOutcome(mod,false);
mod.makeMove(Omove4.row, Omove4.col);
console.log(mod.board);

var Xmove5 = getBestOutcome(mod,true);
mod.makeMove(Xmove5.row, Xmove5.col);
console.log(mod.board);
//Ended in tie.
console.log(mod.isDraw());
console.log(mod.playerWin());
console.log(mod.numOfMoves);
*/


var n = new Model(3,3);
n.addPlayer("X");
n.addPlayer("O");
n.makeMove(0,1);
n.makeMove(1,1);
n.makeMove(2,2);
n.makeMove(1,0);
n.makeMove(2,1);
n.makeMove(0,2);
console.log(n.playerWin())
console.log(n.board);
var move1 = getBestOutcome(n, true); //makes the move X needed to win
n.makeMove(move1.row, move1.col);
console.log(n.board);



