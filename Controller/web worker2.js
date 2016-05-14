var aiWorker = new Worker("code/4tictactoeAI4.js"); //assuming worker is a constructor that can read the file.
var timeout;
aiWorker.addEventListener("message", function(event){
	setTimeout(function(){
		this.addEventListener('click', function(){
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				console.log("Stop trying to make a move!");
			}, 250);
		})
		postMessage(event.data); // assuming that event.data will return the value of the ttt AI file.
	}, 5000);
});





var w = new Worker("code/4tictactoeAI4.js");
w.postMessage(JSON.stringify(model))
