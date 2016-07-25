var serverInterface = new ServerInterface("localhost", 3000);

	//var pass = " ";
window.onload = function(){
	$(document).on('click', '#Sign', function (event){
			var username = document.getElementById('usernme').value
			var pass = document.getElementById('passwrd').value
			SignMe(username,pass);
	});
	AccountInfo();
	
}
function SignMe(username,pass) {
	var count = 0;
	
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
	
	
    serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					if (username==data[i].user && pass ==data[i]["password"]){
						count = 1;
						alert("Welcome "+ username);
						window.location = 'http://localhost:3000/profile.html';
						break;
					}
				}
				if(count==0){
					
					alert("log in failed");
					
				}
			}
		});
	//console.log(items);
}
function AccountInfo(){
	
	
    $.get("/user", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

		//username = data;
        //AccountInfo2(data);  
		
		document.getElementById('name').innerHTML = data.username;
		var userD = data.username;
		serverInterface.getUser(
		function (err, data) {
			if (err) {
				console.log("ERROR getting data: " + err);
				alert("Could not get data from server: " + err);
			} else {	
				for (var i =0; i<data.length;i++){
					
					if (userD==data[i].user){
						count = 1;
						document.getElementById('wins').innerHTML = data[i].wins;
						document.getElementById('loses').innerHTML = data[i].losses;
						//document.getElementById('elo').innerHTML = data[i].ELO;
						break;
					}
				}
				if(count==0){
					//console.log("hello")
					
				}
			}
		});
		//get replays and modify html
		$.ajax({
			type: 'GET',
			url: '/replayTest',
			data : userD,
			success : function(data){
				console.log(data);
				console.log(data[0]);
				console.log(data[0][0]);
				for(iter = 0; iter < data.length; iter++){
					var opt = document.createElement('option');
					opt.value = iter;
					opt.innerHTML = ("Replay " + (iter + 1));
					document.getElementById('sel1').appendChild(opt) 
				}
				
		}
	});

    });

		
	
}

//function AccountInfo2(username){
//}
