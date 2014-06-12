// http://docs.themoviedb.apiary.io/

var Actors = [
	'2963', // Nicolas Cage
	'8891', // John Travolta
	'6384', // Keanu Reeves
	'18269', // Brendan Fraser
];

Parse.Cloud.define("updateFilms", function(request, response) {

  	Parse.Cloud.httpRequest({
	  url: 'http://api.themoviedb.org/3/person/' + Actors[0] + '/movie_credits',
	  headers: {
	    'Content-Type': 'application/json;charset=utf-8',
	  },
	  params: {
	    api_key : '9c03a2919e8baf499f682bc357bac41a'
	  },
	  success: function(httpResponse) {
	    response.success(httpResponse.data);
	  },
	  error: function(httpResponse) {
	  	response.error(httpResponse);
	    //console.error('Request failed with response code ' + httpResponse.status);
	  }
	});

});

// merge together as actor, year, genre
// Then filter out ratings of 4 and 5

// http://api.themoviedb.org/3/person/2963/movie_credits?api_key=9c03a2919e8baf499f682bc357bac41a