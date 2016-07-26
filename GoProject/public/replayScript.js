var boardState = null;
var replays = [];
var index = 0;
var replayIndex = 0;
/*
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
		boardState = data;
        cb(data);  

    }); 
}
*/
function replayButton(){
	user = document.getElementById("userText").value;
	console.log(user);
	$.ajax({
		type: 'GET',
		url: '/replayTest',
		data : user,
		success : function(data){
			console.log(data);
			for(a = 0; a < data.length; a++){
				replays[a] = data[a].replay.slice();
				console.log("REPLAY ITERATION " + replays[a]);
			}
			boardState = {'size':data[0].replay[0].length, 'board':data[0].replay[0]};
			drawBoard(boardState);
			console.log(replays);
		}
	});
}
/*
function getReplay(cb){
	console.log('test');
	$.get("/replay", function(data, textStatus, xhr){
        console.log("Response for /replay: "+textStatus);	
		replay = data[0].replay;
		boardState = {'size':data[0].replay[0].length, 'board':data[0].replay[0]};
			cb(boardState);
	});
}
*/

function drawBoard(state){

    var canvas = $("#canvas"); 
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W);  
    var svg = $(makeSVG(W, H));

    var size = state['size'];

    for (var i = 1; i < size; i++){
        for (var j = 1; j < size; j++){

            svg.append(makeRectangle(500/size * i, 500/size * j, 500/size, 500/size, 'white', 'black'))
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

function next(){
	if(index < (replays[replayIndex].length - 1)){
		index += 1;
		drawBoard({'size':replays[replayIndex][index].length, 'board':replays[replayIndex][index]});
	}
}

function prev(){
	if(index > 0){
		index -= 1;
		drawBoard({'size':replays[replayIndex][index].length, 'board':replays[replayIndex][index]});
	}
}

function init(){

    // do page load things here...
	document.getElementById("replayButton").addEventListener("click", replayButton, false);

    console.log("Initalizing Page...."); 
	//getReplay(drawBoard);
}