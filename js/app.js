$(document).foundation();
$("#search-results").hide();
$("#results-header").hide();

$("#small-random-button").toggleClass("invisible");



$("#search-form").submit(function () {
    $("#main-screen").hide();

    $("#results-header").show();
    $("#search-results").show();

    $("#search-form-wrapper").appendTo("#results-header");
    $(".search-buttons").remove();
    $("#small-random-button").toggleClass("invisible");
    return false;
});