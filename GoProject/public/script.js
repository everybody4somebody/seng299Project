 //@param cb {function} callback to call when the request comes back from the server.
//var serverInterface = new ServerInterface("localhost", 3000);


var boardState = null;


function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

		boardState = data;
        cb(data);

    }); 
}



function drawBoard(state){

    var canvas = $("#canvas"); 
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W);  
    var svg = $(makeSVG(W, H));

    var size = state['size'];

    for (var i = 1; i < size; i++){
        for (var j = 1; j < size; j++){

            svg.append(makeRectangle(500/size * i, 500/size * j, 500/size, 500/size, 'white'))
        }
    }

    var board = state['board'];

    for (var i = 1; i < board.length + 1; i++){
        console.log(board[i - 1]);
        var array = board[i - 1];
        for (var j = 1; j < array.length + 1; j++){
            if (board[i - 1][j - 1] == 1){
                svg.append(makeCircle(500/size * j, 500/size * i, 500/size/3, 'black', i, j));
            }
            else if (board[i - 1][j - 1] == 2){
                svg.append(makeCircle(500/size*j, 500/size*i, 500/size/3, 'blue', i, j));
            }
            else{
                svg.append(makeCircle(500/size*j, 500/size*i, 500/size/3, 'white', i, j));
            }
        }
    }
	canvas.empty();
    canvas.append(svg);

}







function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}

$(document).ready(function(){
    $(document).on('mouseover', '.zero', function (event) {

        this.setAttribute('fill', 'brown');
        this.setAttribute('fill-opacity', '0.8');
    });
});

$(document).ready(function(){
    $(document).on('mouseout', '.zero', function (event) {

        if (this.getAttribute('fill-opacity') == 0.8){
            this.setAttribute('fill', 'white');
            this.setAttribute('fill-opacity', '0');
        }
    });
});

function getMove(ID){
	boardState.position = ID;
	console.log(boardState.position);
	
	$.ajax({
		type: 'POST',
		url: '/move',
		dataType: "json",
		data : JSON.stringify(boardState),
		contentType : "application/json",
		success : function(data){
			console.log(data);
			console.log(status);
			boardState = data;
			console.log(findArmies(data.board));
			drawBoard(data);
		}
	});
}


function findArmies(board) {

    var complexBoard = [];
    var armies = [];
    
    // Populate complexBoard
    for (var i = 0; i < board.length; i++) {
        complexBoard.push([]);
        for (var j = 0; j < board.length; j++) {
            complexBoard[i].push(new Intersection(i, j, board[i][j]));
        }
    }
    
    /**
     * Recursive function that classifies intersections in armies 
     * based on connectivity
     * 
     * @param current {Board.Intersection}
     * @param army {Board.Army}
     * @returns {boolean} true if a liberty is found, false otherwise
     */
    var _findArmiesRec = function(current, army) {

        if (current == null)
            return false;
        else if (current.checked == true)
            return false;
        else if (current.colour == 0)
            return true;
        else if (current.colour != army.colour)
            return false;
            
        current.checked = true;
        var x = current.pos[0];
        var y = current.pos[1];
       
        var left  = (y == 0) ? null : complexBoard[x][y-1];
        var up    = (x == 0) ? null : complexBoard[x-1][y];
        var right = (y == complexBoard.length-1) ? null : complexBoard[x][y+1];
        var down  = (x == complexBoard.length-1) ? null : complexBoard[x+1][y];
        
        if (_findArmiesRec(left, army))
            current.addToLiberties(left);
        if (_findArmiesRec(up, army))
            current.addToLiberties(up);
        if (_findArmiesRec(right, army))
            current.addToLiberties(right);
        if (_findArmiesRec(down, army))
            current.addToLiberties(down);
        
        army.addToken(current);
        
        return false;

   }

    var current = null;
    for (var i = 0; i < complexBoard.length; i++) {
        for (var j = 0; j < complexBoard.length; j++) {
            current = complexBoard[i][j];
            
            if (current.colour == 0)
                continue;
            
            if (current.checked == false) {
                armies.push(new Army(current.colour));
                _findArmiesRec(current, armies[armies.length-1]);
            }
        }
    }
    
    return armies;

}

$(document).ready(function(){
    $(document).on('click', '.zero', function (event) {
		getMove(this.getAttribute("id"));
    });
});