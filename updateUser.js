// still in progress

function updateUser(JSON json) {
	
	var p1 = json["users"][0];
	var p2 = json["users"][1];
	var p1Score = json["score"][0];
	var p2Score = json["score"][1];
	var winner;
	var loser;
	
	if(p1Score == p2Score) {
		// You screwed up
	else if(p1Score > p2Score) {
		winner = p1;
		loser = p2;
	}
	else if(p1Score < p2Score) {
		winner = p2;
		loser = p1;
	}
	
	
	
}