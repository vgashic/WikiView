$(document).foundation();
$("#search-results").hide();
$("#results-header").hide();

$("#small-random-button").toggleClass("invisible");

function showResults(item, index) {
	$("#search-results").append(item);
}

function getResults(textToSearch) {
	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + textToSearch;


	$http.jsonp(url)
		.success(function (data) {
			var results = data.query.pages;

			results.forEach(showResults);
		});
	return false;

}



$("#search-form").submit(function () {
	$("#main-screen").hide();

	$("#results-header").show();
	$("#search-results").show();

	$("#search-form-wrapper").appendTo("#results-header");
	$(".search-buttons").remove();
	$("#small-random-button").toggleClass("invisible");

	getResults();

	return false;
});