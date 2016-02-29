/**
	* Gets the best outcome of the game. AI will either always win or tie.
	* @function
	* @param {object} boardPosition - An object that holds the board's state (which spaces are occupied, who's turn, etc.).
	* @param {boolean} isMaximizingPlayer - Is true or false depending on the turn.
*/

function getBestOutcome(boardPosition, isMaximizingPlayer){

	/**
		* Base Case
	*/
	if (this.playerWin() && isMaximizingPlayer == 1) {
		return 1;
	}
	else if (this.isDraw()){
		return 0;
	}
	else if (this.playerWin() && isMaximizingPlayer == 0) {
		return -1;
	}

	/**
		* Makes a copy of the board object
	*/
	var boardPosition_copy = {};
        for(var pos in this.board){
            boardPosition_copy[pos] = this.board[pos];
        }

    for (var i = 0; i < this.rows; i++) {
    	for (var i = 0; i < this.columns; i++) {

    			if (getBestOutcome(boardPosition_copy, true) > getBestOutcome(boardPosition_copy, false) && this.currentPlayerIndex == 0) {
    				this.makeMove(i,j);
    			}

    			else if (getBestOutcome(boardPosition_copy, false) < getBestOutcome(boardPosition_copy, true) && this.currentPlayerIndex == 1) {
    				this.makeMove(i,j);
   				}
    		
    	}
	}
 
}