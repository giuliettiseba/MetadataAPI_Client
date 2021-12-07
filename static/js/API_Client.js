$(document).ready(function () {
});

$("#call_button").click(function () {
    const human_check = $("#human_check:checked").val()
    const vehicle_check = $("#vehicle_check:checked").val()
    const animal_check = $("#animal_check:checked").val()
    const time_interval = $("#time_interval").val() * 60
    const max_items = $("#max_items").val()
    const guid = $("#guid").val()
    const unique_values = $("#unique_values_check").val()

    const rb_forward = $("#rb_forward:checked").val()
    const direction = (rb_forward) ? "Forward" : "Backward"

    const start_time = $("#start_time").val()

    get_metadata(human_check, vehicle_check, animal_check, time_interval, max_items, guid, direction, start_time, unique_values)


});


function show_table(data) {


    const $table = $('<table/>');
    $table.addClass('table table-sm');
    $table.append('<thead><tr>')
    $table.append('<th scope="col">ObjectId</th>')
    $table.append('<th scope="col">UTC Time</th>')

    $table.append('<th scope="col">X</th>')
    $table.append('<th scope="col">Y</th>')

    $table.append('<th scope="col">Type</th>')
    $table.append('<th scope="col">Likelihood</th>')

    $table.append('</tr></thead>')

    data.forEach(element => {
        $table.append('<tr>')
        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.ObjectId}</td>`)
        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.UtcTime}</td>`)
        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Shape?.CenterOfGravity.X}</td>`)
        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Shape?.CenterOfGravity.Y}</td>`)

        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Class?.ClassCandidates[0]?.Type}</td>`)
        $table.append(`<td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Class?.ClassCandidates[0]?.Likelihood}</td>`)
        $table.append('</tr>')

    });

    $('#here_table').html('').append($table);

}

function get_metadata(human_check, vehicle_check, animal_check, time_interval, max_items, guid, direction, start_time, unique_values) {

    let filter = []
    if (human_check) filter.push('Human')
    if (vehicle_check) filter.push('Vehicle')
    if (animal_check) filter.push('Animal')


    var date = new Date(start_time).toJSON()

    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/Metadata/`,
        data: {
            deviceGuid: guid,
            startTime: date,
            classFilter: JSON.stringify(filter),
            timeInterval: time_interval,
            maxItems: max_items,
            direction: direction,
            uniqueValues: unique_values,
        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
            show_table(data)

        }
    });

    $('#loadingDiv')
        .hide()  // Hide it initially
        .ajaxStart(function () {
            $(this).show();
        })
        .ajaxStop(function () {
            $(this).hide();
        })
    ;

    $("#target").submit(function (event) {
        alert("Handler for .submit() called.");
        event.preventDefault();
    });

    $("#other").click(function () {
        $("#target").submit();
    });

}

