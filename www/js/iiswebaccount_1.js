
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });



        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';
        var iisurl = "https://iiswebsrv.herokuapp.com/";

        var iisWebObjStr = window.localStorage.getItem(iisWebSession);
        var iisWebObj = JSON.parse(iisWebObjStr);
        console.log(iisWebObj);
        var custObjStr = iisWebObj.custObjStr;
        if (custObjStr == null) {
            window.location.href = "index.html";
        }
        var custObj = JSON.parse(custObjStr);

        $.ajax({
            url: iisurl + "/cust/" + custObj.username + "/acc/",
            crossDomain: true,
            cache: false,
            success: function (resultAccList) {
                console.log(resultAccList);
                if (resultAccList == null) {
                    window.location.href = "index.html";
                }

                var accListStr = JSON.stringify(resultAccList, null, '\t');
                var iisWebObj = {'custObjStr': custObjStr, 'accListStr': accListStr};
                window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

                window.location.href = "account.html";
            }
        });

    },
};
app.initialize();





