
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });

        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

        var iisWebObjStr = window.localStorage.getItem(iisWebSession);
        var iisWebObj = JSON.parse(iisWebObjStr);
        console.log(iisWebObj);
        var custObj = iisWebObj.custObj;
        var accListStr = iisWebObj.accList;
        
        console.log(accListStr);

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
                console.log(custObj);
                var jsonCustobjStr = JSON.stringify(custObj, null, '\t');
                window.localStorage.setItem('iisWebSession', {custObj: jsonCustobjStr});


                jsonResutlStr = window.localStorage.getItem()('iisWebSession');
                var custObj = JSON.parse(jsonResutlStr);
                console.log(custObj);

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





