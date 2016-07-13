/*global $, jQuery, alert, console */

$(document).foundation();
$("#search-results").hide();
$("#results-header").hide();

$("#small-random-button").hide();


function getResults(textToSearch) {
	"use strict";
	var apiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=20&gsrsearch=" + textToSearch;


	$.ajax({
			url: apiUrl,
			type: "POST",
			dataType: "jsonp",
			success: function (response) {
				console.log(response);

				var results = response.query.pages;

				for (var prop in results) {
					//console.log(results[prop]);

					var title = results[prop].title;
					var extract = results[prop].extract;
					var pageUrl = results[prop].fullurl;
					var dateModified = moment(results[prop].touched).format("DD.MM.YYYY");

					var htmlElement = "<div class='search-item'> \n \
	<div class='row search-item-title align-self-bottom'><a class='align-self-bottom' href='" + pageUrl + "' target='_blank'>" + title + "</a><span class='modified-date align-self-bottom'> last modified: " + dateModified + "</span></div> \n \
	<div class='row search-item-preview'>" + extract + "</div> \n \
</div>";
					if (extract != null) {
						$("#search-results").prepend(htmlElement);
					} else {
						$("#search-results").append(htmlElement);
					}
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

	$("#search-form-wrapper").detach().appendTo("#results-header");
	$(".search-buttons").remove();

	$("#small-random-button").show();


	if ($("#search-text").val() != "") {
		getResults($("#search-text").val());
	};

	return false;
});