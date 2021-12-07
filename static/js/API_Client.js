$(document).ready(function () {

    var $loading = $('#spinner').hide();
    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });

});


$("#Prev_button").click(function () {
    const new_time = $('#metadata_table tr:last td').eq(1).html()
    $("#start_time").val(new_time)
    $("#rb_backward").prop("checked", true);
    $("#call_button").click();
});

$("#Next_button").click(function () {
    const new_time = $('#metadata_table tr td').eq(1).html()
    $("#start_time").val(new_time)
    $("#rb_forward").prop("checked", true);
    $("#call_button").click();
});


$("#call_button").click(function () {
    const human_check = $("#human_check:checked").val()
    const vehicle_check = $("#vehicle_check:checked").val()
    const animal_check = $("#animal_check:checked").val()
    const time_interval = $("#time_interval").val() * 60
    const max_items = $("#max_items").val()
    const guid = $("#guid").val()
    const unique_values = $("#unique_values_check:checked").val()
    const rb_forward = $("#rb_forward:checked").val()
    const direction = (rb_forward) ? "Forward" : "Backward"
    const start_time = $("#start_time").val()
    get_metadata(human_check, vehicle_check, animal_check, time_interval, max_items, guid, direction, start_time, unique_values)
});


function show_table(data) {


    const $table = $('<table/>');
    $table.addClass('table table-sm');
    $table.attr('id', 'metadata_table');

    $table.append('<thead><tr>')
    $table.append('<th scope="col">ObjectId</th>')
    $table.append('<th scope="col">UTC Time</th>')
    $table.append('<th scope="col">Local Time</th>')
    $table.append('<th scope="col">X</th>')
    $table.append('<th scope="col">Y</th>')
    $table.append('<th scope="col">Type</th>')
    $table.append('<th scope="col">Likelihood</th>')
    $table.append('</tr></thead>')

    data.forEach(element => {
        $table.append(function () {
            return `<tr>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.ObjectId}</td>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.UtcTime}</td>
            <td>${new Date(element.VideoAnalyticsItems[0]?.Frames[0]?.UtcTime).toLocaleTimeString()}</td>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Shape?.CenterOfGravity.X}</td>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Shape?.CenterOfGravity.Y}</td>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Class?.ClassCandidates[0]?.Type}</td>
            <td>${element.VideoAnalyticsItems[0]?.Frames[0]?.Objects[0]?.Appearance?.Class?.ClassCandidates[0]?.Likelihood}</td>
            </tr>`;
        });
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
            uniqueValues: unique_values === undefined ? false : true,
        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
            show_table(data)

        }
    });

    // $('#loadingText').hide().ajaxStart(function () {
    //         $(this).show();
    //     })
    //     .ajaxStop(function () {
    //         $(this).hide();
    //     });

    $("#target").submit(function (event) {
        alert("Handler for .submit() called.");
        event.preventDefault();
    });

    $("#other").click(function () {
        $("#target").submit();
    });

}

