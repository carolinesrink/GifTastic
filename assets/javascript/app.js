var tvShows = ["Game of Thrones", "Parks and Rec", "Girls", "The Office", "Big Little Lies", "Insecure", "Westworld", "Black Mirror", "The Flash", "Arrow", "Sense8", "Dexter", "Peaky Blinders", "Shameless", "Gilmore Girls", "Stranger Things", "Sherlock", "Friends", "Arrested Development", "Breaking Bad"];

$(document).on('click', '.tv', function () {
    $("#gifs-appear-here").empty();


    var TVshow = $(this).attr("data-tv");


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        TVshow + "&api_key=CkqaY7Ki8HSszfuoC1ThzAebps3k7AQ0&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(response);


        for (var i = 0; i < results.length; i++) {


            if (true) {

                var gifDiv = $("<div class='item'>");


                var rating = results[i].rating;


                var p = $("<p>").text("Rating: " + rating);


                var tvImage = $("<img>");

                tvImage.attr("src", results[i].images.fixed_height_still.url);


                tvImage.attr('data-still', results[i].images.fixed_height_still.url);
                tvImage.attr('data-animate', results[i].images.fixed_height.url);
                tvImage.attr('data-state', 'still');


                gifDiv.append(p);
                gifDiv.append(tvImage);


                $("#gifs-appear-here").prepend(gifDiv);

            }
        }

    });
})


function renderButtons() {

    $("#tv-view").empty();


    for (var i = 0; i < tvShows.length; i++) {


        var a = $("<button>");

        a.addClass("tv");

        a.attr("data-tv", tvShows[i]);

        a.text(tvShows[i]);

        $("#tv-view").append(a);
    }
};


$("#add-tv-show").on("click", function (event) {

    event.preventDefault();

    var teleShow = $("#tv-input").val().trim();

    tvShows.push(teleShow);

    console.log(teleShow);


    renderButtons();
});


$(document).on('click', 'img', function () {


    if ($(this).attr('data-state') == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});


renderButtons();