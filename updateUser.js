/*
 *	json:
 *		user1
 *			boolean:	guest
 *			int:		wins
 *			int: 		loses
 *			int: 		largestWin
 *			int: 		winStreak
 *			int:		elo
 *		user2
 *			boolean:	guest
 *			int:		wins
 *			int: 		loses
 *			int: 		largestWin
 *			int: 		winStreak
 *			int:		elo
 *		score
 *			int:		p1
 *			int:		p2
 */

// input json object
// output json object

DEFAULT_ELO = 2000;

function updateUser(JSON json) {
	
	var p1 = json["user1"];
	var p2 = json["user2"];
	var p1Elo;
	var p2Elo;
	var p1Score = json["score"][0];
	var p2Score = json["score"][1];
	
	if (p1Score > p2Score) {
		// calculate new elo
		results = calcRank(json["user1"], json["user2"]);
		// update user1
		json["user1"]["elo"] = results[0];
		json["user1"]["wins"]++;
		json["user1"]["winStreak"]++;
		if((p1Score - p2Score) > json["user1"]["largestWin"]) {
			json["user1"]["largestWin"] = (p1Score - p2Score);
		}
		// update user2
		json["user2"]["elo"] = results[1];
		json["user2"]["loses"]++;
		json["user2"]["winStreak"] = 0;
	
	} else if(p1Score < p2Score) {
		// calculate new elos
		results = calcRank(json["user2"], json["user1"]);
		// update user1
		json["user1"]["elo"] = results[1];
		json["user1"]["loses"]++;
		json["user1"]["winStreak"] = 0;
		// update user2
		json["user2"]["elo"] = results[0];
		json["user2"]["wins"]++;
		json["user2"]["winStreak"]++;
		if((p2Score - p1Score) > json["user2"]["largestWin"]) {
			json["user2"]["largestWin"] = (p2Score - p1Score);
		}
	}
	
return json["users"];
	
}

// input 2 users
// output A[] where i = 0 is winner's updated elo and i = 1 is loser's updated elo
function calcRank(winner, loser) {
	var Rw;
	var Rw2;
	var Rl;
	var Rl2;
	var Sw;
	var Sl;
	var A[];
	
	// check if winner is guest
	if(winner["guest"]) {
		Rw = DEFAULT_ELO;
	} else {
		Rw = winner["elo"];
	}
	
	// check if loser is guest
	if(loser["guest"]) {
		Rl = DEFAULT_ELO;
	} else {
		Rl = loser["elo"];
	}
	
	// calculate odds
	if(Rw > Rl) {
		var D = Rw - Rl;
		Sl = 1 / (Math.E^(D/Rl));
		Sw = 1 - Sl;
	
	// calculate odds
	} else if(Rl >= Rw) {
		var D = Rw - Rl;
		Sw = 1 / (Math.E^(D/Rl));
		Sl = 1 - Sw;
	}
	
	// get k values
	var Kw = calcK(Rw);
	var Kl = calcK(Rl);
	
	// calculate new elo
	A[0] = Rw + Kw * (1 - Sw);
	A[1] = Rl + Kw * (-Sl);
	
	return A;

}

// calculate k value
function calcK(int R) {
	
	var K;
	
	if(R < 2000) {
		K = 30;
	} else if((R >= 2000) && (R <= 2500)) {
		K = Math.floor((2200 - R)/15 + 30);
	} else {
		K = 10;
	}
	
	return K;
}
	