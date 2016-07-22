var serverInterface = new ServerInterface("localhost", 3000);

	//var pass = " ";
window.onload = function(){
	$(document).on('click', '#Sign', function (event){
			alert("Log in success");
			var username = document.getElementById('usernme').value
			var pass = document.getElementById('passwrd').value
			SignMe(username,pass);
	});
	AccountInfo();
	
}
function SignMe(username,pass) {
	var count = 0;
    console.log("Account Info");
	console.log(username)
	console.log(pass);
	
    $.ajax({
        type: 'POST',
        url : '/user',
        dataType: "json",
        data : JSON.stringify({'username': username}), 
        contentType : "application/json",
        success : function(data){
            console.log(data);
            console.log(status);
        }
    });
	
	
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
						window.location = 'http://localhost:3000/profile.html';
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
	
	
    $.get("/user", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

		//username = data;
        //AccountInfo2(data);  
		console.log("dsfsdf")
		console.log(data.username);
		
		document.getElementById('name').innerHTML = data.username;
		var userD = data.username;
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
					if (userD==data[i].user){
						count = 1;
						document.getElementById('wins').innerHTML = data[i].wins;
						document.getElementById('loses').innerHTML = data[i].losses;
						document.getElementById('elo').innerHTML = data[i].ELO;
						break;
					}
				}
				if(count==0){
					console.log("hello")
					
				}
			}
		});

    });

		
	
}

//function AccountInfo2(username){
//}
