"use strict";

var express = require("express");
var bodyParser = require("body-parser"); 
var users = [];
var NextMoveScript = require("./public/NextMoveScript.js");

var Storage = require('./lib/MongoDB');
var app = express();

app.use(express.static('public'));

app.use(require("body-parser").json());


var boardState = generateBoard();
var lastMove = {x : 0, y : 0,c : 0, pass: false};

var db = new Storage(null,null, 'user')

function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
		position : [0,0],
    }

    state.size = 9 ///Game board size

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
/*
	db.getAllUsers(function(err, data){
         if(err){
            res.status(500).send();
        }else{
            console.log(data)
            res.status(200).json(data);
        } 
     });
*/

/**
 * Handle a request for task data.
 */
app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
	// console.log(users);
	res.json(boardState); 
});
app.get("/DBdata",function (req, res){
	console.log("GET Request to: /DBdata");
	db.getAllUsers(function(err, data){
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
	db.getAllUsers(function(err, data){
         if(err){
            res.status(500).send();
        }else{
			users = data;
			//logsin(users);
            res.status(200).json(data);
        } 
     });
	
})



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
app.post("/add", function (req, res) {

    console.log("POST Request to: /add");
    
    db.addUser(req.body, function(err){
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
    });
    
    res.status(200).send();
});





app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
	db.connect(function(){
        // some message here....
    });
});
