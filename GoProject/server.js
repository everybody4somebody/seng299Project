"use strict";

var express = require("express");
var NextMoveScript = require("./public/NextMoveScript.js");
var util = require('util');
var app = express();

var aiInterface = require("./aiInterface");

app.use(express.static('public'));

app.use(require("body-parser").json());

var boardSize = 3;
var boardState = generateBoard();



function generateBoard(){
    if (boardSize != 3){
        if (boardSize.indexOf('x') != -1){
            boardSize = boardSize.replace(/(^\d+)(.+$)/i,'$1');
        }
    }



    var state = {
        size : boardSize, 
        board  : [],
        lastMove : {x : 0, y : 0, c : 0, pass: false},
		position : [0,0],
    }

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

app.post("/size", function(req, res){
    console.log("POST Request to: /size");
    boardSize = req.body.boardSize;
});

app.post("/move", function(req, res){
    console.log("POST Request to: /move");
    console.log(req.body);
    NextMoveScript.move(req.body.board, req.body.lastMove, req.body.position, function(move){
        boardState.board[move._x][move._y] = move._c;
        boardState.lastMove = move;
        res.json(boardState);
    });
});


app.post("/randmove", function(req, res){

    console.log("POST Request to: /randmove");
    NextMoveScript.move(req.body.board, req.body.lastMove, req.body.position, function(move){
        boardState.board[move._x][move._y] = move._c;
        boardState.lastMove = move;
    });
    aiInterface.getRandomMove(boardState.size, boardState.board, boardState.lastMove, function(move){
        boardState.board[move.x][move.y] = move.c;
        boardState.lastMove = move; 
        res.json(boardState);
    });

});


app.get("/new", function (req, res) {
    console.log("GET Request to: /new");
    boardState = generateBoard()
    res.json(boardState); 
});

app.post("/delete", function(req, res){
    boardState.board = req.body.board;
    res.json(boardState);
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
