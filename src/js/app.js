(function() {

	var hammer_options = {};

	$("#element")
	  .hammer(hammer_options)
	  .on("swipeleft swiperight", function(ev) {
	  	console.log(ev);
	  });

})();

function getRandom() {
	// Start keyframe animation
	// Select random Actor
	// Select random Decade
	// Select random Genre
	// Start API call
	// Stop keyframe animation
	// Animate to selected Actor,Decade,Genre
	// Display API call results
}