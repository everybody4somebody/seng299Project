"use strict";

var Board = require("./Board.js");


	
function move(board, lastMove, position, cb){
	var newMove = new Board.Move();
	var tmpX = (parseInt(position[0],10) - 1);
	var tmpY = (parseInt(position[2],10) - 1);

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
	
	

	

	
	

