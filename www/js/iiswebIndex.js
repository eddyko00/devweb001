
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

        var iisWebSession = "iisWebSession";

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

                var custObj = result.custObj;
                console.log(custObj)
                

                var CustobjStr = JSON.stringify(custObj, null, '\t');
                var iisWebObj={'custObj':CustobjStr};                
                window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

//                var iisWebObjStr = window.localStorage.getItem('iisWebSession');
//                var iisWebObj = JSON.parse(iisWebObjStr);
//                console.log(iisWebObj);

                if (custObj != null) {
//                    window.location.href = "#page-signup-succeeded";
                    window.location.href = "account.html";
                } else {
//                    $('#error_message').fadeIn().html(jsonStr);
                    $('#error_message').fadeIn().html("Incorrect email/password. Please try again.");
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





