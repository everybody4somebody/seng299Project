window.onload = function(){


	$(document).on('click', '#play_button', function (event){
		size = document.getElementById('board_size').options[document.getElementById('board_size').selectedIndex].value;
		theme = document.getElementById('theme').options[document.getElementById('theme').selectedIndex].value;
		postSize(size);
		newBoard(drawBoard);

		if (theme != 'default'){
			console.log(theme);
		    $.ajax({
		        type: 'POST',
		        url : '/theme',
		        dataType: "json",
		        data : JSON.stringify({"theme": theme}), 
		        contentType : "application/json",
		        success : function(data){
		            console.log(data);  
		        }
		    });
		}
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
