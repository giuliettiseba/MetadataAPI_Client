$(document).ready(function () {
});

$("#call_button").click(function () {
    const human_check = $("#human_check:checked").val()
    const vehicle_check = $("#vehicle_check:checked").val()
    const animal_check = $("#animal_check:checked").val()
    const time_interval = $("#time_interval").val() * 60
    const max_items = $("#max_items").val()
    const guid = $("#guid").val()

    const rb_forward = $("#rb_forward:checked").val()
    const start_time = $("#start_time").val()





    get_metadata(human_check, vehicle_check, animal_check, time_interval, max_items, guid, rb_forward, start_time)


});


    function show_table(data) {


        // {
        //         "ObjectId": 4509092,
        //         "Appearance": {
        //             "Transformation": null,
        //             "Shape": {
        //                 "BoundingBox": {
        //                     "Bottom": -0.859236,
        //                     "Top": -0.688721,
        //                     "Right": -0.205661,
        //                     "Left": -0.248829,
        //                     "LineColor": null,
        //                     "LineDisplayPixelThickness": null,
        //                     "FillColor": null
        //                 },
        //                 "CenterOfGravity": {
        //                     "X": -0.227245,
        //                     "Y": -0.773978
        //                 },
        //                 "IsValid": true
        //             },
        //             "Class": {
        //                 "ClassCandidates": [
        //                     {
        //                         "Type": "Human",
        //                         "Likelihood": 0.5,
        //                         "IsValid": true
        //                     }
        //                 ]
        //             },
        //             "Description": null
        //         },
        //         "Behaviour": null
        //     }


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

    function get_metadata(human_check, vehicle_check, animal_check, time_interval, max_items, guid,rb_forward, start_time, ) {

        let filter
        if (human_check) filter = 'Human'

        // NOT IMPLEMENTED
        // else if (vehicle_check) filter = 'Vehicle'
        // else if (animal_check) filter = 'Animal'

        var date = new Date(start_time).toJSON()

        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/api/Metadata/`,
            data: {
                type: filter,
                timeInterval: time_interval,
                maxItems: max_items,
                time_interval: time_interval,
                guid: guid,
                rb_forward: rb_forward,
                start_time: date,
            },
            dataType: 'json',
            success: function (data) {
                console.log(data)
                show_table(data)

            }
        });


        $("#target").submit(function (event) {
            alert("Handler for .submit() called.");
            event.preventDefault();
        });

        $("#other").click(function () {
            $("#target").submit();
        });

    }

