"use strict";
var replayLog = [];
var express = require("express");
var NextMoveScript = require("./public/NextMoveScript.js");
var util = require('util');
var app = express();
var users = [];
var theme = '';
var username;
var userWins;
var userLosses;

var aiInterface = require("./aiInterface");

var DBInterface = require("./node_modules/express/DBInterface.js");

app.use(express.static('public'));

app.use(require("body-parser").json());

var bodyParser = require("body-parser"); 

var boardSize = 9;
var boardState = generateBoard();


function generateBoard(){
    if (boardSize != 9){
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

function logsin(user){
    //console.log(user);
    return true;
}


app.get("/DBdata",function (req, res){
    console.log("GET Request to: /DBdata");
    DBInterface.getAllUsers(function(err, data){
         if(err){
            res.status(500).send();
        }else{
            res.status(200).json(data);
        } 
     });
});

app.get("/login", function (req,res){
    console.log("POST Request to: /login");
    var users = [];
    DBInterface.getAllusers(function(data){
        users = data;
        //console.log(users);
        res.json(users);
        
    });
    
})

app.get("/replayTest", function (req, res) {
    console.log("GET Request to: /replayTest");
    console.log(req.url);
	var user = req.url.substring(12);
	DBInterface.DBDump('replays');
	DBInterface.DBDump('users');
    DBInterface.getReplays(user, 
		function(replay){
			res.json(replay);
		}
	);
	
});

/**
 * Handle a request for task data.
 */

app.get("/user",function (req, res){
    console.log("GET Request to: /user");
    res.json(username);
});

app.post("/user", function(req, res){
    console.log("POST Request to: /user");
    username = {'username' : req.body.username};
	userWins = req.body.wins;
	userLosses = req.body.losses;
	console.log(username['username']);
	console.log("DEBUG; USER WINS: " + userWins);
	console.log("DEBUG; USER LOSSES: " + userLosses);
});


app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
    res.json(boardState); 
});

app.get("/theme", function (req, res) {
    console.log("GET Request to: /data");
    res.json(theme); 
});


app.post("/size", function(req, res){
    console.log("POST Request to: /size");
    boardSize = req.body.boardSize;
});

app.post("/theme", function(req, res){
    console.log("POST Request to: /theme");
    theme = req.body;
});

app.post("/move", function(req, res){
    console.log("POST Request to: /move");
    console.log(req.body);
    NextMoveScript.move(req.body.board, req.body.lastMove, req.body.position, function(move){
        boardState.board[move._x][move._y] = move._c;
        boardState.lastMove = move;
		var boardCopy = [];
		for(var p = 0; p < boardState.board.length; p++){
			boardCopy[p] = boardState.board[p].slice();
		}
		replayLog.push(boardCopy);
        res.json(boardState);
    });
});


app.post("/add", function (req, res) {

    console.log("POST Request to: /add");
    
    DBInterface.createAccount(req.body.Username, req.body.Userpassword, function(err){
        if(err){
            res.status(500).send();
        }else{
            
            res.status(200).send();
        }
    });
    
    res.status(200).send();
});

app.post("/randmove", function(req, res){

    console.log("POST Request to: /randmove");

    aiInterface.getRandomMove(boardState.size, boardState.board, boardState.lastMove, function(move){
        boardState.board[move.x][move.y] = move.c;
        boardState.lastMove = move;
		var boardCopy2 = [];
		for(var o = 0; o < boardState.board.length; o++){
			boardCopy2[o] = boardState.board[o].slice();
		}
		replayLog.push(boardCopy2);
        res.json(boardState);
    });

});

app.post("/updateStats", function(req, res){
	console.log("POST request to /updateStats");
	console.log(req.body);
	console.log(replayLog.length);
	var winner = req.body;
	if(username){
		console.log("USERNAME: " + username['username'] + " WINNER: " + winner['winner']);
		if('Player 1' == winner['winner']){
			userWins += 1;
		} else {
			userLosses += 1;
		}
		DBInterface.updateStats(username['username'], {'wins' : userWins, 'losses' : userLosses}, replayLog, function(){});
	}
});

app.get("/new", function (req, res) {
    console.log("GET Request to: /new");
    boardState = generateBoard()
	replayLog = [];
    res.json(boardState); 
});

app.post("/delete", function(req, res){
    boardState.board = req.body.board;
    res.json(boardState);
});

function connect(callback) {
        callback(null);
}


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
