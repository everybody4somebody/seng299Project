 //@param cb {function} callback to call when the request comes back from the server.
//var serverInterface = new ServerInterface("localhost", 3000);


var boardState = null;


function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
        cb(data);  

    }); 
}


//@param state {object} - an object representing the state of the board.  
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
                svg.append(makeCircle(500/size * j, 500/size * i, 500/size/3, 'black'));
            }
            else if (board[i - 1][j - 1] == 2){
                svg.append(makeCircle(500/size*j, 500/size*i, 500/size/3, 'blue'));
            }
            else{
                svg.append(makeCircle(500/size*j, 500/size*i, 500/size/3, 'white'));
            }
        }
    }
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

function getMove(){
	
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
			drawBoard(data);
		}
	});
}

$(document).ready(function(){
    $(document).on('click', '.zero', function (event) {
		getMove();
    });
});