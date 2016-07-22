var serverInterface = new ServerInterface("roberts.seng.uvic.ca", 30010);

function LogIn1() {
	var usernme = document.getElementById("username1").value;
	var pass = document.getElementById("password1").value;
	var count = 0;
    console.log("Account Info");
	console.log(usernme)
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
					if (usernme==data[i].user && pass ==data[i]["password"]){
						count = 1;
						console.log("welcome"+usernme);
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
}
function LogIn2() {
	var usernme = document.getElementById("username2").value;
	var pass = document.getElementById("password2").value;
	var count = 0;
    console.log("Account Info");
	console.log(usernme)
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
					if (usernme==data[i].user && pass ==data[i]["password"]){
						count = 1;
						console.log("welcome"+usernme);
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
}