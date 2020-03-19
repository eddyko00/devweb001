
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });


        var iisurl = "https://iiswebsrv.herokuapp.com/";
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
        var accObjListStr = iisWebObj.accObjListStr;
        var accObjList = JSON.parse(accObjListStr);


        if (custObj.type == 99) {
            var htmlAdmin = '<button id="serverbtn"  >Server</button>';
            htmlAdmin += '<button id="lockbtn" >Lock</button>';

            $("#adminid").html(htmlAdmin);
        }


        $("#accheader").html("Customer " + custObj.username);

        for (i = 0; i < accObjList.length; i++) {
            var accObj = accObjList[i];
            console.log(accObj);
            var accName = accObj.accountname;
            var accId = accObj.id;
            $("#myid").append('<li id="' + accId + '"><a href="#">' + accName + '</a></li>');
        }



        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var accId = $(this).attr('id');
            console.log(accId);
            if (accId == 0) {
//                alert(accId);
                return;
            }

            var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr, 'accId': accId};
            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
            window.location.href = "accountst_1.html";
        });

        $("#lockbtn").click(function () {

            $.ajax({
                url: iisurl + "cust/" + custObj.username + "/sys/lock",

                crossDomain: true,
                cache: false,
                success: function (resultLockObjList) {
                    console.log(resultLockObjList);
                    if (resultLockObjList == null) {
                        window.location.href = "#page-lock";
                    }
                    for (i = 0; i < resultLockObjList.length; i++) {
                        var lockObj = resultLockObjList[i];
                        var trStr = lockObj.lockdatedisplay + '  ' + lockObj.lockname +
                                '  type:' + lockObj.type + '<br>' + lockObj.comment;
                        var htmlName = '<h3>' + trStr + '</h3>';
                        $("#lockid").append('<li >' + htmlName + '</li>');
                    }

                    window.location.href = "#page-lock";
                }
            });
        });


        $("#serverbtn").click(function () {

            $.ajax({
                url: iisurl + "server",

                crossDomain: true,
                cache: false,
                success: function (resultServerList) {
                    console.log(resultServerList);
                    if (resultServerList == null) {
                        window.location.href = "#page-lock";
                    }
                    for (i = 0; i < resultServerList.length; i++) {
                        var srvObj = resultServerList[i];
                        var trStr = srvObj.lastServUpdateESTdate + '  ' + srvObj.serverName;
                        trStr += '  maintance=' + srvObj.sysMaintenance;
                        trStr += '<br>' + srvObj.timerMsg;
                        trStr += '<br>' + srvObj.timerThreadMsg;
                        var htmlName = ' ' + trStr + ' ';
                        $("#serverid").append('<li ></li>' + htmlName);
                    }
                    window.location.href = "#page-server";
                }
            });
        });


// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();





