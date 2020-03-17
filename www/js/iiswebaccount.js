
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {
            if (accObjList == null) {
                window.location.href = "index.html";
            } else {
                for (i = 0; i < accObjList.length; i++) {
                    var accObj = accObjList[i];
                    console.log(accObj);
                }
            }
        });



        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

        var iisWebObjStr = window.localStorage.getItem(iisWebSession);
        var iisWebObj = JSON.parse(iisWebObjStr);
        console.log(iisWebObj);
        var custObjStr = iisWebObj.custObjStr;
        var custObj = JSON.parse(custObjStr);
        var accObjListStr = iisWebObj.accListStr;
        var accObjList = JSON.parse(accObjListStr);
        console.log(accObjList);
        
        
        $("#accheader").html("Customer "+ custObj.username);
        
        for (i = 0; i < accObjList.length; i++) {
            var accObj = accObjList[i];
            console.log(accObj);
            var accName = accObj.accountname;
            var accId = accObj.id;
            $("#myid").append('<li id="'+accId+'"><a href="#">'+accName+'</a></li>');
        }
        
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


        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text());
            alert($(this).attr('id')); // gets text contents of clicked li

            console.log($(this));
        });

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();





