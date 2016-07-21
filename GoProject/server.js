"use strict";

var express = require("express");
var NextMoveScript = require("./public/NextMoveScript.js");
var DBInterface = require("./node_modules/express/DBInterface.js");

var app = express();

app.use(express.static('public'));

app.use(require("body-parser").json());


var boardState = generateBoard();
var lastMove = {x : 0, y : 0,c : 0, pass: false};



function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
		position : [0,0],
    }

    state.size = 9

    var tmp = []; 
    for(var i = 0; i < state.size; i++){
        tmp = []; 
        for(var j = 0; j < state.size; j++){
            tmp.push(0); 
        }
        state.board.push(tmp);
    }
	boardState = state;
    return state; 

}


/**
 * Handle a request for task data.
 */
app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
    res.json(boardState); 
});

app.get("/replay", function (req, res) {
    console.log("GET Request to: /replay");
    console.log(req.body);
    DBInterface.getReplays('test', 
		function(replay){
			console.log(replay)
			res.json(replay);
		}
	);
});

app.get("/replayTest", function (req, res) {
    console.log("GET Request to: /replayTest");
    console.log(req.url);
	var user = req.url.substring(12);
    DBInterface.getReplays(user, 
		function(replay){
			res.json(replay);
		}
	);
	
});


app.post("/move", function(req, res){
	console.log("POST Request to: /move");
	console.log(req.body);
	NextMoveScript.move(req.body.board, lastMove, req.body.position, function(move){
		console.log(move._c);
		boardState.board[move._x][move._y] = move._c;
		lastMove = move;
		res.json(boardState);
	});
});






app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
