var TitlesActedIn, genre, actor;
var actors = [
	"Nicolas%20Cage",
	"Keanu%20Reeves",
	"John%20Travolta",
	"Brendan%20Fraser"
]

var genres = [
	"Action & Adventure",
	"Horror",
	"Drama",
	"Comedies",
	"Adventure"
]

var decades = [
	"1980",
	"1990",
	"2000",
	"2010"
]

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	var height = $('#cage').height();
	$('#slotMachine').height(height);
	
	$('#actor.slot').jSlots({
        spinner : '#play',
        time : 4000,
        onEnd : function(finalNumbers){
        	actor = actors[finalNumbers-1];
        }
    });
    
    $('#genre.slot').jSlots({
        spinner : '#play',
        time : 6000,
        onEnd : function(finalNumbers){
        	genre = genres[finalNumbers-1];
        }
    });
    
    $('#year.slot').jSlots({
        spinner : '#play',
        time : 9000,
        onEnd : function(finalNumbers){
        	decade = decades[finalNumbers-1];
        	getOdata();
        }
    });
}

// Add in default low rating < 3 stars
function setTitlesActedIn(result) {
 	TitlesActedIn = result.d.results[0].TitlesActedIn.results;

    $("#results").empty();
    
    console.log("The Genre is: " + genre);
    console.log(TitlesActedIn);
    
    for (var i = 0; i < TitlesActedIn.length; i++) {
    	var year = String(decade).split("",3).join("");
		var movieYear = String(TitlesActedIn[i].ReleaseYear).split("",3).join("");
		// Remove setting title to fix below
		// Move into own function
		var title = {
			"Name": TitlesActedIn[i].Name,
			"Art": TitlesActedIn[i].BoxArt.MediumUrl,
			"Rating": TitlesActedIn[i].Rating,
			"ReleaseYear": TitlesActedIn[i].ReleaseYear
		};
		
		console.log(title.Name);
		// Doesnt delay and makes last movie the title.Name
    	if(year === movieYear) {
	    	$.ajax({
	    		url: TitlesActedIn[i].Genres.__deferred.uri+'?$format=json',
				success: function(genreResult){
					var movie;
					// Insert regex to check
					//console.log(genreResult.d.length);
					//console.log(title.Name + " - Year: " + year + " - Movie Year: " + movieYear);
					
					for(var j = 0; j < genreResult.d.length; j++) {
						//console.log(genreResult.d[j].Name);
						//console.log(genreResult.d[j].Name + " = " + genre);
						if(genreResult.d[j].Name === genre){
							//console.log(title.Name + ": " + genreResult.d[j].Name + " = " + genre);
							
							/*movie = '<div class="moveInfo"><img src="' + titleArt + '"/>'
				    		+ '<p><em>Name:</em> ' + titleName + '</p>'
				    		+ '<p><em>Rating:</em> ' + titleRating + '</p>'
				    		+ '<p><em>ReleaseYear:</em> ' + titleReleaseYear + '</p></div>';
				    		
				    		$("#results").append(movie);*/
						}
					}
				}
	    	});
    	}
    }
    
}

function getOdata(){
	var queryURL = "http://odata.netflix.com/v2/Catalog/People?$filter=Name%20eq%20'" + actor +"'&$expand=TitlesActedIn&$format=json&$callback=?";
	
	$.ajax({

		url: queryURL,
		contentType: 'application/json; charset=utf-8',
		dataType: 'jsonp',
		//jsonpCallback: 'setTitlesActedIn',
		beforeSend: function() {
	    	$('#results').empty().append('<center><img src="assets/img/ajax-loader.gif"/></center>');
	  	},
		success: setTitlesActedIn,
		error: function() {
			alert('Error occurred');
		},
		timeout: 60000
	
	});
}
