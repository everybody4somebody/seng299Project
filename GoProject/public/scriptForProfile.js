var serverInterface = new ServerInterface("roberts.seng.uvic.ca", 30010);
var replayIndex = 0;
var stepIndex = 0;
var replays = [];

	//var pass = " ";
window.onload = function(){
	$(document).on('click', '#Sign', function (event){
			var username = document.getElementById('usernme').value
			var pass = document.getElementById('passwrd').value
			SignMe(username,pass);
	});
	/*$(document).on('click', '#ReplayButton', function (event){
			//var username = document.getElementById('usernme').value
			//var pass = document.getElementById('passwrd').value
			Replays();
	});*/
	AccountInfo();
	
}
function onSelection(){
	console.log("TEST: " + replays);
	replayIndex = document.getElementById("sel1").selectedIndex;
	stepIndex = 0;
	drawBoard({'size':replays[replayIndex][stepIndex].length, 'board':replays[replayIndex][stepIndex]});
}


function SignMe(username,pass) {
	var count = 0;
	
    $.ajax({
        type: 'POST',
        url : '/user',
        dataType: "json",
        data : JSON.stringify({'username': username}), 
        contentType : "application/json",
        success : function(data){
            //console.log(data);
            console.log(status);
        }
    });
	
	
    serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					if (username==data[i].user && pass ==data[i]["password"]){
						count = 1;
						alert("Welcome "+ username);
						window.location = 'http://roberts.seng.uvic.ca:30010/profile.html';
						break;
					}
				}
				if(count==0){
					
					alert("log in failed");
					
				}
			}
		});
	
	//console.log(items);
}
/*function Replays() {
	//var x = document.getElementById("replayOptions");
    //var option = document.createElement("option");
    //option.text = "Replay4";
    //x.add(option);
	
	
	$.get("/user", function(data, textStatus, xhr){
        console.log("Response for /user: "+textStatus);  
		var username = data.username;
		$.get("/DatabaseStuff", function(Re, textStatus, xhr){
			console.log("Response for /data: "+textStatus);  
			var Replaylist = Re;/// add the implementation for the replays 
		
		});
    });
}*/
function AccountInfo(){
	
	
    $.get("/user", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

		//username = data;
        //AccountInfo2(data);  
		
		document.getElementById('name').innerHTML = data.username;
		var userD = data.username;
		serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					
					if (userD==data[i].user){
						count = 1;
						document.getElementById('wins').innerHTML = data[i].wins;
						document.getElementById('loses').innerHTML = data[i].losses;
						//document.getElementById('elo').innerHTML = data[i].ELO;
						break;
					}
				}
				if(count==0){
					//console.log("hello")
					
				}
			}
		});
		//get replays and modify html
		$.ajax({
			type: 'GET',
			url: '/replayTest',
			data : userD,
			success : function(data){
				for(a = 0; a < data.length; a++){
					replays[a] = data[a].replay.slice();
					console.log("REPLAY ITERATION " + replays[a]);
					var opt = document.createElement('option');
					opt.value = a;
					opt.innerHTML = ("Replay " + (a + 1));
					document.getElementById('sel1').appendChild(opt);
				}
				drawBoard({'size':replays[replayIndex][stepIndex].length, 'board':replays[replayIndex][stepIndex]});
			}
		});
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
	if(stepIndex < (replays[replayIndex].length - 1)){
		stepIndex += 1;
		drawBoard({'size':replays[replayIndex][stepIndex].length, 'board':replays[replayIndex][stepIndex]});
	}
}

function prev(){
	if(stepIndex > 0){
		stepIndex -= 1;
		drawBoard({'size':replays[replayIndex][stepIndex].length, 'board':replays[replayIndex][stepIndex]});
	}
}


//function AccountInfo2(username){
//}
