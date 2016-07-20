var http = require("http");

function getRandomMove(size, board, lastMove, cb){

    // TODO: Implement me...

    // See https://nodejs.org/api/http.html#http_http_request_options_callback

    var postData = {
    	'size': parseInt(size),
    	'board': board,
    	'last': lastMove
    }
    if ('_x' in postData.last){
        newLast = { x: postData.last._x,
                    y: postData.last._y,
                    c: postData.last._c,
                    pass: postData.last._pass
                };
        postData.last = newLast;
    }
    console.log();
    console.log();
    console.log('post Data: ');
    console.log(postData);
    console.log();

        var options = {
        	hostname: 'roberts.seng.uvic.ca',
        	path: '/ai/maxLibs',
        	port: 30000,
        	method: 'POST',
        	headers: {'content-type': 'application/json'}
        }

        var callback = function(response){
        	var str = "";
        	response.on('data', function(chunk){
        		str+=chunk.toString();
                console.log();
                console.log();
                console.log('chunk:');
        		console.log(chunk.toString());
        	});

        	response.on('end', function(){
        		cb(JSON.parse(str));
        		console.log('no more response');
        	});
        }

        var req = http.request(options, callback);  
      	req.on('error', function(e){
        	console.log('problem with request: ${e.message}');
        });
        req.write(JSON.stringify(postData));
        req.end();

    }

    module.exports = {
        getRandomMove : getRandomMove
}