//console.log("Model loaded");
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

	/**
		* Makes a copy of the model and board.
		* @function
		* @param {constructor} board - the model.
	*/
	copyModel: function(model) {
		var copy = [];
		for (var i = 0; i < this.rows; i++) {
			var rowsCopy = [];
			copy.push(rowsCopy);
			for (var j = 0; j < this.columns; j++){
				copy[i][j] = this.board[i][j];
			}
		}	
		var newModel = new Model(this.rows, this.columns);
		newModel.board = copy;
		newModel.playerList = this.playerList;
		newModel.gameOver = this.gameOver;
		newModel.changeListeners = this.changeListeners;
		newModel.currentPlayerIndex = this.currentPlayerIndex;
		newModel.numOfMoves = this.numOfMoves;
		return newModel;
	},
	
	removeMove: function(row,col){
		if(this.board[row][col] != ""){
			this.board[row][col] = "";	
			this.currentPlayerIndex = ((this.currentPlayerIndex-1)%this.playerList.length)*-1;
			this.numOfMoves -= 1;
			return true;
		} else {
			return false;
		}
		
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


function mapper1(input) {
  // input consists of a list of objects in the form {key: modelString, value: {parentModels: parentModelStringList, isAITurn: true/false}}
  return input.map(function(kVPair) {
    var stringModel = kVPair.key; // the model is the key of the input
    var parsedModel = JSON.parse(stringModel);
    
    var KVPairOutputs = []; // the KV pairs we want to return
    for (var i = 0; i < parsedModel.rows; i++){
    	for( var j = 0; j < parsedModel.columns; j++){
    		var parsedModelCopy = Model.prototype.copyModel.call(parsedModel);
    		if(parsedModelCopy.isValidMove(i,j) && parsedModelCopy.gameOver == false){
    			parsedModelCopy.makeMove(i,j);
    		
    			KVPairOutputs.push({
    				key: JSON.stringify(parsedModelCopy),
    				value: {
    					parentModels: [stringModel],
    					isAITurn: !(kVPair.value.isAITurn)
    				}
    			});
    		}

    	}
    }

    return KVPairOutputs;
  });

}

function flatten(itemList) {
	return itemList.reduce(function(arr, list) {
		return arr.concat(list);	
	});
}

function sort(kVPairList) {
	kVPairList.sort(function(kVPair1, kVPair2) {
		var val = 0;
		if(kVPair1.key < kVPair2.key) {
			val = -1;
		}
		else if(kVPair1.key > kVPair2.key) {
			val = 1;
		}
		
		return val;
	});
}

function plus(a, b) {
	return {
		parentModels: a.parentModels.concat(b.parentModels),
		isAITurn: b.isAITurn
		};
}


function reducer1(sortedKeyValuePairs) {
	var i = 0;
	var keyValuesList = [];
	while(i < sortedKeyValuePairs.length) {
		var key = sortedKeyValuePairs[i].key;
		var singleKeyValuesList = {key: key, values:[]};
		while(i < sortedKeyValuePairs.length && key === sortedKeyValuePairs[i].key) {
			singleKeyValuesList.values.push(sortedKeyValuePairs[i].value);
			i++;
		}
		keyValuesList.push({key: singleKeyValuesList.key, 
		                    value: singleKeyValuesList.values.reduce(plus)
		                   });
	}
	
	return keyValuesList;
}

function mapper2(input) {
  // input consists of a list of objects in the form {key: modelString, value: {parentModels: parentModelStringList, isAITurn: true/false}}
  return input.map(function(kVPair) {
    var stringModel = kVPair.key; // the model is the key of the input
    var parsedModel = JSON.parse(stringModel);
    
    var KVPairOutputs = []; // the KV pairs we want to return
    	var parsedModelCopy = Model.prototype.copyModel.call(parsedModel);
    		var computatedPointValue;
    		if(parsedModelCopy.playerWin() && parsedModelCopy.playerWin() == "X"){
    			computatedPointValue = 3;
    		}
    		else if(parsedModelCopy.isDraw()){
    			computatedPointValue = 2;
    		}
    		else if(parsedModelCopy.playerWin() && parsedModelCopy.playerWin() == "O"){
    			computatedPointValue = 1;
    		}
    		else{
    			computatedPointValue = 0;
    		};
    		
    		KVPairOutputs.push({
    			key: JSON.stringify(parsedModelCopy),
    			value: {
    				parentModels: kVPair.value.parentModels,
    				isAITurn: kVPair.value.isAITurn,
    				points: computatedPointValue
    						
    				}
    			}
    		);

    return KVPairOutputs;
  });

}

function reducer2(sortedKeyValuePairs) {
	var i = 0;
	var keyValuesList = [];
	while(i < sortedKeyValuePairs.length) {
		var key = sortedKeyValuePairs[i].key;
		var singleKeyValuesList = {key: key, values:[]};
		while(i < sortedKeyValuePairs.length && key === sortedKeyValuePairs[i].key) {
			singleKeyValuesList.values.push(sortedKeyValuePairs[i].value);
			i++;
		}
		keyValuesList.push({key: singleKeyValuesList.key, 
		                    value: singleKeyValuesList.values.reduce(plus2)
		                   });
	}
	
	return keyValuesList;
}

function plus2(a, b) {
	return {
		parentModels: a.parentModels.concat(b.parentModels),
		isAITurn: b.isAITurn,
		points: b.points
		};
}


function mapper3(input) {
	//input will be last output used from reducer2 and previous output from reducer4
  return input.map(function(kVPair) {
    var stringModel = kVPair.key; // the model is the key of the input
    var parsedModel = JSON.parse(stringModel);
    
    var KVPairOutputs = []; // the KV pairs we want to return
    	var parsedModelCopy = Model.prototype.copyModel.call(parsedModel);
    	
    		for(var i = 0; i < kVPair.value.parentModels.length; i++){
    			if(kVPair.value.parentModels != undefined){
    				KVPairOutputs.push({
    					key: {
    						childModel: JSON.stringify(parsedModelCopy),
    						parentModel: kVPair.value.parentModels[i]
    					},
    					value: {
    						isAITurn: kVPair.value.isAITurn,
    						points: kVPair.value.points
    						}
    					});
    			} else {
    				/*** remove a move ***/
    				var removed = false;
    				while(removed = false){
    					for(var i = 0; i < this.rows; i++){
    						for(var j = 0; j < this.columns; j++){
    							if(this.board[i][j] != ""){
    								var possibleModel = parsedModelCopy.removeMove(i,j);
    								removed = true;
    							}
    						}
    					}
    				}
    				KVPairOutputs.push({
    					key: JSON.stringify({
    						childModel: parsedModelCopy,
    						possibleParentModel: possibleModel
    					}),
    					value: {
    						isAITurn: kVPair.value.isAITurn,
    						points: kVPair.value.points,
    						needsVerification: true
    					}
    				});
    			}
    	}

    return KVPairOutputs;
  });

}

function reducer3(sortedKeyValuePairs) {
	var i = 0;
	var keyValuesList = [];
	while(i < sortedKeyValuePairs.length) {
		var key = sortedKeyValuePairs[i].key;
		var singleKeyValuesList = {key: key, values:[]};
		while(i < sortedKeyValuePairs.length && key === sortedKeyValuePairs[i].key) {
			singleKeyValuesList.values.push(sortedKeyValuePairs[i].value);
			i++;
		}
		keyValuesList.push({key: singleKeyValuesList.key, 
		                    value: singleKeyValuesList.values.reduce(plus3)
		                   });
	}
	
	return keyValuesList;
}

function plus3(a, b) {
	if(b.points == 0){
		return {
			isAITurn: b.isAITurn,
			points: b.points,
			needsVerification: b.needsVerification
			}
	} else {
		return {
			isAITurn: b.isAITurn,
			points: b.points
		}
	}
}

var mod = new Model(3,3);
mod.addPlayer("X");
mod.addPlayer("O");
/*
mod.makeMove(0,2);
mod.makeMove(0,0);
console.log(mod);
mod.removeMove(0,2);
console.log(mod);
mod.makeMove(2,0);
mod.removeMove(1,2);
console.log(mod);
*/

var firstPair = 
[{
	key: JSON.stringify(mod), 
	value: 
	{
		parentModels: [],
		isAITurn: false,
		points: 0
	}
}];

/*
var output = flatten(mapper1(firstPair));
console.log(output);
sort(output);
//console.log(output);
console.log("break");
console.log(reducer1(output));
var output2 = reducer1(output);
console.log("break");
var input1 = flatten(mapper2(output2));
sort(input1);
console.log(input1);
console.log("break");
console.log(reducer2(input1));
*/
/*** THE isAITurn IS NOT CHANGING AT ALL THROUGHOUT THE PROCESS***/

var arr = [];
var loopInput = firstPair
for(var iteration = mod.numOfMoves; iteration < 9; iteration++){
	var input1 = flatten(mapper1(loopInput));
	sort(input1);
	var output1 = reducer1(input1);
	var input2 = flatten(mapper2(output1));
	sort(input2);
	var loopInput = reducer2(input2);
	arr.push(loopInput);
	console.log(loopInput);
	
}
console.log(arr);

console.log("break");
console.log(mapper3(arr[8]));
var t = flatten(mapper3(arr[8]));
sort(t);
console.log("break");
console.log(reducer3(t));