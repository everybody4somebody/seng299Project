window.onload = function(){


	$(document).on('click', '#play_button', function (event){
		size = document.getElementById('board_size').options[document.getElementById('board_size').selectedIndex].value;
		console.log(size);
		postSize(size);
		window.location = 'http://localhost:3000/game.html';

	});




	function postSize(size){
		$.ajax({
		type: 'POST',
		url: '/size',
		dataType: "json",
		data : JSON.stringify({boardSize: size}),
		contentType : "application/json",
		success : function(data){
			console.log(data);
			console.log(status);
			boardState = data;
			drawBoard(data);
		}
	});
	}


}
