 //@param cb {function} callback to call when the request comes back from the server.
//var serverInterface = new ServerInterface("localhost", 3000);


var boardState = null;
var armies = [];

function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

		boardState = data;
        cb(data);  

    }); 
}


function newBoard(cb){
    $.get("/new", function(data, textStatus, xhr){
        console.log("Response for /new: "+textStatus);  

        boardState = data;
        cb(data);  

    }); 
}



function drawBoard(state){

    console.log(state);

    var canvas = $("#canvas");
    canvas.html('');
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

function idkwut2callit(){
    newBoard(drawBoard);
}


function init(){
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


$(document).ready(function(){
    $(document).on('click', '.zero', function (event) {
		//getMove(this.getAttribute("id"));
        getRandomMove(this.getAttribute('id'));
    });
});

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


// Sends request to server to retrieve a move from the random address of the AI
function getRandomMove(id){

    boardState.position = id;
    boardState.lastMove.x = id.substr(0, id.indexOf(','));
    boardState.lastMove.y = id.substr(id.indexOf(',') + 1);
    boardState.lastMove.c = getNextMoveColour(boardState.lastMove.c);
    $.ajax({
        type: 'POST',
        url : '/randmove',
        dataType: "json",
        data : JSON.stringify(boardState), 
        contentType : "application/json",
        success : function(data){
            console.log(data);
            console.log(status);
            boardState = data;
            drawBoard(data);    
        }
    });

}


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
            armies = findArmies(boardState.board);
            var checkDeletion = checkDeletions(boardState.board);
            boardState.board = checkDeletion.newBoard;
            drawBoard(boardState);
            
        if  (checkDeletion.bool){
            $.ajax({
            type: 'POST',
            url: '/delete',
            dataType: "json",
            data : JSON.stringify(boardState),
            contentType : "application/json",
            success : function(data){
                console.log(data);
                console.log(status);
            }
        });
        }
        }
    });
}





function checkDeletions(board){
    
     var state = { 
        newBoard  : board,
        bool : false,
    }
    
    var numArmies = armies.length;
    var counter = 0;
    while (counter < numArmies){
        if (armies[counter].liberties == 0){
            state.bool = true;
            console.log("An army has been defeated");
            var numTokens = armies[counter].tokens.length;
            var internalCounter = 0;
            while (internalCounter < numTokens){
                state.newBoard[armies[counter].tokens[internalCounter]._pos[0]][armies[counter].tokens[internalCounter]._pos[1]] = 0;
                internalCounter = internalCounter + 1;
            }
        }
        counter = counter + 1;
    }
    
    
    return state;
}




function checkValidity(ID){
    var isValid = false;
    var tmpX = (parseInt(ID[0],10) - 1);
    var tmpY = (parseInt(ID[2],10) - 1);
    var colour = getNextMoveColour(boardState.lastMove);
    console.log(colour);
    
    
    
    if (!((tmpX-1) < 0)){
        if (boardState.board[tmpX - 1][tmpY] == 0 || boardState.board[tmpX - 1][tmpY] == colour){
            isValid = true;
        }
    }
        
    
    if(!((tmpX + 1) > (boardState.size - 1))){
        if (boardState.board[tmpX + 1][tmpY] == 0 || boardState.board[tmpX + 1][tmpY] == colour){
            isValid = true;
        }
    }
        
    
    if (!((tmpY - 1) < 0)){
        if (boardState.board[tmpX][tmpY - 1] == 0 || boardState.board[tmpX][tmpY - 1] == colour){
            isValid = true;
        }
    }
        
    
    if (!((tmpY + 1) > (boardState.size - 1))){
        if (boardState.board[tmpX][tmpY + 1] == 0 || boardState.board[tmpX][tmpY + 1] == colour){
            isValid = true;
        }
    }
        
    
    
    
    
    
    return isValid;
}


function getNextMoveColour(m){
    switch(m._c){
        
        case BLACK:
            return WHITE;
            break;
        case WHITE:
            return BLACK;
            break;
        case NONE:
            return BLACK;
            break;
        default:
            return BLACK;
            break;
    }
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
        if (checkValidity(this.getAttribute("id"))){
            getMove(this.getAttribute("id"));
        }else{
            alert("That move is invalid");
        }
    });
});



function Pass(){
    if (boardState.lastMove._pass == true){
        alert("GAME OVER");
    }else{
        var newMove = new Move();
        newMove._x = 0;
        newMove._y = 0;
        newMove._c = 0;
        newMove._pass = true;
        console.log(newMove);
        boardState.lastMove = newMove;
        $.ajax({
            type: 'POST',
            url: '/delete',
            dataType: "json",
            data : JSON.stringify(boardState),
            contentType : "application/json",
            success : function(data){
                console.log(data);
                console.log(status);
            }
        });
    }
    
}
