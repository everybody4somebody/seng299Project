"use strict";

var Board = require("./Board.js");


	
function move(board, lastMove, cb){
	var newMove = new Board.Move();
	var tmpX = 2;
	var tmpY = 5;

	newMove._x = tmpX;
	newMove._y = tmpY;
	newMove._c = getNextMoveColour(lastMove);
	newMove.pass = false;
	console.log(newMove);
	cb(newMove);
}


function getNextMoveColour(m){
	switch(m.colour){
		
		case Board.BLACK:
			return Board.WHITE;
			break;
		case Board.WHITE:
			return Board.BLACK;
			break;
		case Board.NONE:
			return Board.BLACK;
			break;
		default:
			return Board.BLACK;
			break;
	}
}

module.exports = {
	move:move
}
	
	

	

	
	

