"use strict";

var Board = require("./Board.js");


	
function move(board, lastMove, position, cb){
	var newMove = new Board.Move();
	console.log(position);
	console.log(position.substr(0, position.indexOf(',')));
	console.log(position.substr(position.indexOf(',') + 1));
	var tmpX = (parseInt(position.substr(0, position.indexOf(',')),10) - 1);
	var tmpY = (parseInt(position.substr(position.indexOf(',') + 1),10) - 1);

	newMove._x = tmpX;
	newMove._y = tmpY;
	newMove._c = getNextMoveColour(lastMove);
	newMove.pass = false;
	console.log(newMove);
	cb(newMove);
}


function getNextMoveColour(m){
	switch(m._c){
		
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
	
	

	

	
	

