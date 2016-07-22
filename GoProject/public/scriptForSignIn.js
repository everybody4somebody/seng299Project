var serverInterface = new ServerInterface("localhost", 3000);
/*window.onload = function(){
	document.getElementById('Player1SignIn').onclick = function Sign(){
		
		var vis = document.getElementById("Player1visible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
	document.getElementById('Player2SignIn').onclick = function Sign(){
		
		var vis = document.getElementById("Player2visible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
	document.getElementById('VSAI').onclick = function ChangeToAI() { 
		var change = document.getElementById("name2");
		change.innerHTML = "AI"

	}
	
}*/
function LogIn() {
	var username = document.getElementById("usernme").value;
	var pass = document.getElementById("passwrd").value;
	var count = 0;
    console.log("Account Info");
	console.log(username)
	console.log(pass);
    serverInterface.getUser(
		function (err, data) {
			console.log(data);
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					console.log(data[i]);
					if (username==data[i].user && pass ==data[i]["password"]){
						count = 1;
						console.log("welcome"+username);
						alert("Success")
						break;
					}
					console.log(data[i].user)
				}
				if(count==0){
					
					alert("log in failed");
					
				}
				console.log(data);
				console.log("what?");
			}
		});
	//console.log(items);
}
