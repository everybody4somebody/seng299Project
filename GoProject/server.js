"use strict";

var util = require('util');
var express = require("express");
var NextMoveScript = require("./public/NextMoveScript.js");

var app = express();

app.use(express.static('public'));

app.use(require("body-parser").json());


var boardState = generateBoard();



function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
		lastMove  : {_x : 0, _y : 0,_c : 0, _pass: false},
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




app.post("/move", function(req, res){
	console.log("POST Request to: /move");
	console.log(req.body);
	console.log(req.body.lastMove);
	NextMoveScript.move(req.body.board, req.body.lastMove, req.body.position, function(move){
		boardState.board[move._x][move._y] = move._c;
		boardState.lastMove = move;
		res.json(boardState);
	});
});



app.post("/delete", function(req, res){
	boardState.board = req.body.board;
	res.json(boardState);
});






app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
