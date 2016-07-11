$(document).foundation();
$("#search-results").hide();
$("#results-header").hide();



$("#search-form").submit(function () {
	$("#main-screen").hide();

	$("#results-header").show();
	$("#search-results").show();
	return false;
});