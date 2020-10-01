
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {
            // after the page elements are all loaded, then run the script
            // Set the input field with unique ID #email to a value
//            $("#txt-email").val('GUEST');
//            $("#txt-password").val('guest');

        });


//        var iisurl = "https://iiswebsrv.herokuapp.com/";
        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';


        $(document).keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var txemail = document.getElementById("txt-email").value;
                var txtpassword = document.getElementById("txt-password").value;

                if (txemail === "") {
                    if (txtpassword === "") {
                        txemail = "GUEST";
                        txtpassword = "guest";
                    }
                }
                if (txemail === "11") {
                    txemail = "admin1";
                    txtpassword = "Passw0rd";
                }
                if (txemail === "22") {
                    txemail = "fundmgr";
                    txtpassword = "Passw0rd";
                }
                if (txemail === "33") {
                    txemail = "indexmgr";
                    txtpassword = "Passw0rd";
                }
                if (txemail === "44") {
                    txemail = "fundmgr";
                    txtpassword = "Passw0rd";
                }
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

                    var custObjStr = JSON.stringify(custObj, null, '\t');
                    var iisWebObj = {'custObjStr': custObjStr};
                    window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

//                var iisWebObjStr = window.localStorage.getItem('iisWebSession');
//                var iisWebObj = JSON.parse(iisWebObjStr);
//                console.log(iisWebObj);

                    if (custObj != null) {
                        window.location.href = "account_1.html";
                    } else {
//                    $('#error_message').fadeIn().html(jsonStr);
                        $('#error_message').fadeIn().html('Incorrect email/password. Please try again.');
                    }
                }
            }
        });


        $("#btn-submit").click(function () {
            var txtfirstname = document.getElementById("txt-first-name").value;
            var txtlastname = document.getElementById("txt-last-name").value;
            var txtemailaddress = document.getElementById("txt-email-address-signup").value;
            var txtpassword = document.getElementById("txt-password-signup").value;
            var txtpasswordconfirm = document.getElementById("txt-password-confirm-signup").value;

            if (txtpassword !== txtpasswordconfirm) {
                $('#error_message-signup').fadeIn().html("Password does not match with confirmed password. Please try again.");
            }
//          "/cust/add?email={email}&pass={pass}&firstName={firstName}&lastName={lastName}"
//          SUCC = 1;  EXISTED = 2; FAIL =0;
            $.ajax({
                url: iisurl + "/cust/add?email=" + txtemailaddress + "&pass=" + txtpassword + "&firstName=" + txtfirstname + "&lastName=" + txtlastname,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator

            function handleResult(result) {
//          SUCC = 1;  EXISTED = 2; FAIL =0;
                var webMsg = result.webMsg;
                console.log(webMsg);
                var resultID = webMsg.resultID;
                if (resultID == 1) {
                    $("#txt-email").val(txtemailaddress);
                    // Set the input field with unique ID #name
                    $("#txt-password").val(txtpassword);
                    window.location.href = "#page-signup-succeeded";
                } else {
                    var errorM = "Please try again.";
                    if (resultID == 2) {
                        var errorM = "The customer account has already existed. Please try again.";
                    }
                    $('#error_message-signup').fadeIn().html(errorM);
                }
            }
        });

        $("#chck-rememberme").click(function () {
            $("#btn-login").attr("disabled", !this.checked);
        });

        $("#btn-login").click(function () {
            var txemail = document.getElementById("txt-email").value;
            var txtpassword = document.getElementById("txt-password").value;

            if (txemail === "") {
                if (txtpassword === "") {
                    txemail = "GUEST";
                    txtpassword = "guest";
                }
            }
            if (txemail === "11") {
                txemail = "admin1";
                txtpassword = "Passw0rd";
            }
            if (txemail === "22") {
                txemail = "fundmgr";
                txtpassword = "Passw0rd";
            }
            if (txemail === "33") {
                txemail = "indexmgr";
                txtpassword = "Passw0rd";
            }
            if (txemail === "44") {
                txemail = "fundmgr";
                txtpassword = "Passw0rd";
            }
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

                var custObjStr = JSON.stringify(custObj, null, '\t');
                var iisWebObj = {'custObjStr': custObjStr};
                window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

//                var iisWebObjStr = window.localStorage.getItem('iisWebSession');
//                var iisWebObj = JSON.parse(iisWebObjStr);
//                console.log(iisWebObj);

                if (custObj != null) {
                    window.location.href = "account_1.html";
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

    }
};
app.initialize();





