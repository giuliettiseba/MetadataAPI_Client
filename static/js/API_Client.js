$(document).ready(function () {
    get_metadata('2021-12-03T05:25')
});

$("#next_button").click(function () {
    const datatime = $(".nextDateTime").text()
    get_metadata(datatime)

});

$("#prev_button").click(function () {
    const datatime = $(".previousDateTime").text()
    get_metadata(datatime)
});


function get_metadata(datatime) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/Metadata/${datatime}`,
        dataType: 'json',
        success: function (data) {
            $('.dateTime').text(data.DateTime);
            $('.nextDateTime').text(data.NextDateTime);
            $('.previousDateTime').text(data.PreviousDateTime);
            $('.candidates').text('');

            data.Candidates.forEach(candidate => $('.candidates').append(`<p>${candidate.Key}: ${candidate.Value} </p>`))
        }
    });


    $("#target").submit(function (event) {
        alert("Handler for .submit() called.");
        event.preventDefault();
    });

    $( "#other" ).click(function() {
  $( "#target" ).submit();
});

}

