"use strict";

var Board = require("./Board.js");


	
function move(board, lastMove, cb){
	var newMove = new Board.Move();
	newMove.colour = this.getNextMoveColour(lastMove);

	var tmpX = 0;
	var tmpY = 0;

	newMove.x = tmpX;
	newMove.y = tmpY;
	newMove.pass = false;

	return newMove;
}


function getNextMoveColour(m){
	switch(m.colour){
		
		case Board.BLACK:
			return Board.WHITE;
			break;
		case Board.WHITE:
			return Board.Black;
			break;
		case Board.NONE:
			return Board.BLACK;
			break;
		default:
			return Board.BLACK;
			break;
	}
}
	
	

	

	
	

