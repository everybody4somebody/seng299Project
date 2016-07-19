var serverInterface = new ServerInterface("localhost", 3000);
window.onload = function(){
	document.getElementById('PlayerSignUp').onclick = function SignUp(){
		
		var vis = document.getElementById("SignUpvisible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
}
function add() {
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass").value;
	
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

