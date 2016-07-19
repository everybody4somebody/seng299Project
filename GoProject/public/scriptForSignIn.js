var serverInterface = new ServerInterface("localhost", 3000);
window.onload = function(){
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
	
}
function LogIn() {
	var username = document.getElementById("usernme").value;
	var pass = document.getElementById("passwrd").value;
	
    console.log("Account Info");

    serverInterface.getUser(username, function (err, data) {

        if (err) {
            console.log("ERROR getting data: " + err);
            alert("Could not get data from server: " + err);
        } else {
			
            console.log("what?");
        }

    });
}