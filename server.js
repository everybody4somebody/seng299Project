"use strict";

var express = require("express");
var NextMoveScript = require("./public/NextMoveScript.js");

var app = express();

app.use(express.static('public'));




var boardState = generateBoard();
var lastMove = {x : 0, y : 0,c : 0, pass: false};



function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
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




app.post("/move", function(req, res){
	console.log("POST Request to: /move");
	
	console.log(NextMoveScript);
	NextMoveScript.move(boardState.board, lastMove, function(move){
		boardState.board[move.x][move.y] = move.c;
		lastMove = move;
		res.json(boardState);
	});
});






app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
