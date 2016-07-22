var serverInterface = new ServerInterface("localhost", 3000);

function LogIn1() {
	var usernme = document.getElementById("username1").value;
	var pass = document.getElementById("password1").value;
	var count = 0;
    serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					if (usernme==data[i].user && pass ==data[i]["password"]){
						count = 1;
						document.getElementById('player1-username-display').innerHTML = usernme;
						alert("Welcome "+usernme)
						break;
					}
				}
				if(count==0){
					
					alert("log in failed");
					
				}
			}
		});

    $.ajax({
        type: 'POST',
        url : '/user',
        dataType: "json",
        data : JSON.stringify({'username': username}), 
        contentType : "application/json",
        success : function(data){
            //console.log(data);
            console.log(status);
        }
    });
}
function LogIn2() {
	var usernme = document.getElementById("username2").value;
	var pass = document.getElementById("password2").value;
	var count = 0;
    serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					if (usernme==data[i].user && pass ==data[i]["password"]){
						count = 1;
						document.getElementById('player2-username-display').innerHTML = usernme;
						alert("Welcome "+ usernme);
						break;
					}
				}
				if(count==0){
					
					alert("log in failed");
					
				}
			}
		});
}
window.onload = function(){
	document.getElementById('player1-guest').onclick = function() {
		document.getElementById('player1-username-display').innerHTML = "Guest";
	}
	document.getElementById('player2-guest').onclick = function() {
		document.getElementById('player2-username-display').innerHTML = "Guest";
	}
	
}