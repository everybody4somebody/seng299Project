"use strict";

var Board = require("./Board.js");


	
function move(board, lastMove, position, cb){
	var newMove = new Board.Move();
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
		
		case 1:
			return 2;
			break;
		case 2:
			return 1;
			break;
		case 0:
			return 1;
			break;
		default:
			return 1;
			break;
	}
}

module.exports = {
	move:move
}
	
	

	

	
	

