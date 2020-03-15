
var app = {
    // Application Constructor
    initialize: function () {


        var iisurl = "https://iiswebsrv.herokuapp.com/";

        $("#loadImage").click(function () {
            $.ajax({
                url: iisurl+"cust/login?email=guest&pass=guest",
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator

            function handleResult(result) {
                $("#desc").text(result.webMsg.result);
            }
        });

        $("#randomImage").click(function () {
            $.ajax({
                url: url + "&date=" + randomDate(new Date(2015, 0, 1), new Date()),
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator

            function handleResult(result) {
                $("#spaceimage").attr("src", result.url);

                //http://responsiveimg.com/
                $("#spaceimage").responsiveImg();

                $("#copyright").text("Copyright: " + result.copyright);
                $("#desc").text(result.explanation);
            }
        });
    },
};

app.initialize();



function checkForm() {
    var result = true;

    $(".errorMsg").remove();

    $("input[type='text'], input[type='password']").each(function (idx) {
        if (this.value.length == 0) {

            $("#messageList").append(
                    "<li class='errorMsg'>Input can not be empty: " + this.name
                    + "</li>");

            result = false;
            $(this).addClass("inputErr");
        } else {
            $(this).removeClass("inputErr");
        }
    });


    if (result == false) {
        $("#messages").show();
    } else {
        $("#messages").hide();
    }

    return result;

}

