window.onload = function(){
	document.getElementById('SignIn').onclick = function Sign(){
		
		var vis = document.getElementById("visible");
		console.log ("vis");
		vis.style.visibility = "visible";

	}
	document.getElementById('VSAI').onclick = function ChangeToAI() { 
		var change = document.getElementById("name2");
		change.innerHTML = "AI"

	}
	
}
