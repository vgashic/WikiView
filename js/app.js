$(document).foundation();
//$("#search-results").hide();
$("#results-header").hide();

$("#small-random-button").hide();

function showResults(item, index) {
	$("#search-results").append(item);
}

function getResults(textToSearch) {
	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + textToSearch;


	$.ajax({
			url: url,
			type: "POST",
			dataType: "jsonp",
			success: function (response) {
				console.log(response);

				var results = response.query.pages;

				for (var prop in results) {
					//console.log(results[prop]);

					var title = results[prop].title;
					var extract = results[prop].extract;

					var htmlElement = "<div class='search-item'> \n \
	<div class='row search-item-title'>" + title + "</div> \n \
	<div class='row search-item-title'>" + extract + "</div> \n \
</div>";
					$("#search-results").append(htmlElement);
				}
				$("#search-results").show();
			}
		}

	)
}



$("#main-screen #search-form").submit(function () {
	$("#main-screen").hide();

	$("#results-header").show();

	$("#search-results").empty();
	$("#search-results").show();

	$("#search-form-wrapper").detach().appendTo("#results-header");
	$(".search-buttons").remove();
	$("#small-random-button").show();

	getResults($("#search-text").val());

	return false;
});