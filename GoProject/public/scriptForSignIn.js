window.onload = function(){
	document.getElementById('PlayerSignUp').onclick = function SignUp(){
		
		var vis = document.getElementById("SignUpvisible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
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