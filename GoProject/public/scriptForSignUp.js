var serverInterface = new ServerInterface("roberts.seng.uvic.ca", 30010);
/*window.onload = function(){
	document.getElementById('PlayerSignUp').onclick = function SignUp(){
		
		var vis = document.getElementById("SignUpvisible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
}*/
function add() {
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass").value;
	var wins = 0;
	var losses = 0;
	var ELO = 0;
	
    serverInterface.addUser(
		username,
		pass,
		function (data) {
            serverInterface.getData(function (err, data) {
                if (err) {
                    console.log("Error getting data: " + err);
                }
				else {
					console.log("no error");
				}
            });
        }
    );
}

