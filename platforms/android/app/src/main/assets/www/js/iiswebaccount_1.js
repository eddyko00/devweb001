
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });

//        var iisurl = "https://iiswebsrv.herokuapp.com/";
        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

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
            beforeSend: function () {
                 $("#loader").show();
            },
            
            success: function (resultAccObjList) {
                console.log(resultAccObjList);
                if (resultAccObjList == null) {
                    window.location.href = "index.html";
                }

                var accObjListStr = JSON.stringify(resultAccObjList, null, '\t');
                var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr};
                window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

                window.location.href = "account.html";
            }
        });

    },
};
app.initialize();





