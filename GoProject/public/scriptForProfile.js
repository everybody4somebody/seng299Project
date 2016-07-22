var serverInterface = new ServerInterface("roberts.seng.uvic.ca", 30010);

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
    });
	
	/*
	    
	$.get("/path of the Replays", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  
		document.getElementById('replays').innerHTML = data.username;
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
    });
	*/
	
	
	
	

		
	
}

//function AccountInfo2(username){
//}
