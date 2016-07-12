window.onload = function(){
	document.getElementById('SignIn').onclick = function Sign(){
		
		var vis = document.getElementById("credentials1");
		document.getElementById("SignIn").style.visibility = "hidden";
		console.log("vis");
		vis.style.visibility = "visible";

	}
	document.getElementById('VSAI').onclick = function ChangeToAI() { 
		var change = document.getElementById("name2");
		change.innerHTML = "AI"

	}
	
}
