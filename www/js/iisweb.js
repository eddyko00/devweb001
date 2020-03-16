
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {
            // after the page elements are all loaded, then run the script
            // Set the input field with unique ID #email to a value
            $("#txt-email").val('GUEST');
            // Set the input field with unique ID #name
            $("#txt-password").val('guest');

        });


        var iisurl = "https://iiswebsrv.herokuapp.com/";
        $("#btn-login").click(function () {
            var txemail = document.getElementById("txt-email").value;
            var txtpassword = document.getElementById("txt-password").value;
            $.ajax({
                url: iisurl + "cust/login?email=" + txemail + "&pass=" + txtpassword,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator

            function handleResult(result) {
                console.log(result.custObj)
                var custObj = result.custObj;
                var jsonStr = JSON.stringify(result, null, '\t');

                if (custObj != null) {
                    window.location.href = "#page-signup-succeeded";
                } else {
                    $('#error_message').fadeIn().html(jsonStr);
                }
            }
        });

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();
//function checkForm() {
//    var iisurl = "https://iiswebsrv.herokuapp.com/";
//    var result = true;
//
//    $(".errorMsg").remove();
//
//    var userId = document.getElementById("userId").value;
//    var password = document.getElementById("password").value;
//    if (userId.length == 0) {
//        userId = "guest";
//        password = "guest";
//    }
//
//
//    $("input[type='password']").each(function (idx) {
//        if (this.value.length == 0) {
//
//            $("#messageList").append(
//                    "<li class='errorMsg'>Input can not be empty: " + this.name
//                    + "</li>");
//
//            result = false;
//            $(this).addClass("inputErr");
//        } else {
//            $(this).removeClass("inputErr");
//        }
//    });
//
//
//    if (result == false) {
//        $("#messages").show();
//        return result;
//    } else {
//        $("#messages").hide();
//    }
//
//    $.ajax({
//        url: iisurl + "cust/login?email=" + userId + "&pass=" + password,
//        crossDomain: true,
//        cache: false,
//        success: handleResult
//    }); // use promises
//
//    // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator
//
//    function handleResult(result) {
//        $("#desc").text(result.webMsg.result);
//    }
//
//    return result;
//}



