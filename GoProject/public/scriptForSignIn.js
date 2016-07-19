window.onload = function(){
	document.getElementById('SignIn').onclick = function SignInAppear(){
		
		var vis = document.getElementById("")
		var selections = document.getElementById('Projects');
		var name = document.getElementById('newProjectInput').value;
		selections.options[selections.options.length] = new Option(name, name);

	}
	document.getElementById('start').onclick = function clockStart() { 
		startDate = new Date();
		interval = setInterval(update, 1000);
		update();

	}
	document.getElementById('deleteButton').onclick = function(){
		var checks = document.getElementsByClassName('task-delete-check');
		for (var i = 0; i < checks.length; i++){
			if (checks[i].checked){
				checks[i].parentNode.parentNode.remove();
				i--;
			}
		}
	}
	
}
