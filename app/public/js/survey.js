// Capture the form inputs
$("#submit").on("click", function (event) {
    event.preventDefault();
    // Form validation
    function validateForm() {
        var isValid = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });

        $(".chosen-select").each(function () {

            if ($(this).val() === "") {
                isValid = false;
            }
        });
        return isValid;
    }

    if (localStorage.getItem("submitted")) {

            $("#results-modal").modal("toggle");

    } else {


        // If all required fields are filled
        if (validateForm()) {
            // Create an object for the user"s data
            let userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            // AJAX post the data to the friends API.
            $.post("/api/friends", userData, function (data) {

                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                $("#match-name").text(data[0].name);
                $("#match-img").attr("src", data[0].photo);
                localStorage.setItem("submitted", true);
                localStorage.setItem("place",parseInt(data[1]));
                // Show the modal with the best match
                $("#results-modal").modal("toggle");

            });
            $.get(`/api/friends`, function(req, res) {
                localStorage.setItem("uPosition", (req.length - 1));
                // Create get sum to setup an additional check
                function getSum(total, num) {
                    return parseInt(total) + parseInt(num);
                }
                // Get your question total sum for a check later
                let questionTotal = req[localStorage.getItem("uPosition")].scores.reduce(getSum)
                // Store in local storage
                localStorage.setItem("valueCheck", questionTotal);
            })
        } else {
            $("#form-error-modal").modal("toggle");
        }
    }
});

$(`#reset`).on("click", function(event){
    //TODO go to database and remove your localstorage place value
    localStorage.clear();
    window.location.reload();

})