// http://docs.themoviedb.apiary.io/

var Actors = [
	'2963', // Nicolas Cage
	'8891', // John Travolta
	'6384', // Keanu Reeves
	'18269', // Brendan Fraser
];

var Genres = [
	'action',
	'adventure',
	'comedy',
	'drama',
	'horror'
];

Parse.Cloud.define("updateFilms", function(request, response) {
	var responseData = [];
	var actorsLength = Actors.length;
	var i;

	for(i = 0;i < actorsLength;i++) {
	  	Parse.Cloud.httpRequest({
		  url: 'http://api.themoviedb.org/3/person/' + Actors[i] + '/movie_credits',
		  headers: {
		    'Content-Type': 'application/json;charset=utf-8',
		  },
		  params: {
		    api_key : '9c03a2919e8baf499f682bc357bac41a'
		  },
		  success: function(httpResponse) {
		  	responseData.push(httpResponse.data);

		  	if(i === actorsLength - 1) {
		  		response.success(responseData);
		  	}
		    //response.success(httpResponse.data);
		  },
		  error: function(httpResponse) {
		  	response.error(httpResponse);
		    //console.error('Request failed with response code ' + httpResponse.status);
		  }
		});
	}

});

// merge together as actor, year, genre
// Then filter out ratings of 4 and 5

// http://api.themoviedb.org/3/person/2963/movie_credits?api_key=9c03a2919e8baf499f682bc357bac41a