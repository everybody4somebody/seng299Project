var serverInterface = new ServerInterface("localhost", 3000);
var username = " ";
	//var pass = " ";
window.onload = function(){

	$(document).on('click', '#Sign', function (event){
			alert("Log in success");
			username = document.getElementById('login_username1').value
			window.location = 'http://localhost:3000/profiles.html';
	});
}
function SignMe(username,pass) {
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
				console.log("whyyyy")
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
function AccountInfo(){
	var count = 0;
	console.log("this is "+ username)
	document.getElementById("name").innerHTML = username;
	/*serverInterface.getUser(
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
						document.getElementById("name").innerHTML = data[i].user;
			
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
		});*/
}