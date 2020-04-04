
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
        var accObjListStr = iisWebObj.accObjListStr;
        var accObjList = JSON.parse(accObjListStr);

        var commObjListStr = iisWebObj.commObjListStr;

        if (commObjListStr !== "") {
            var commObjList = JSON.parse(commObjListStr);

            var htmlhead = '<div class="ui-grid-b">';
            htmlhead += '<div class="ui-block-a" style="width:30%"><strong>Date</strong></div>';
            htmlhead += '<div class="ui-block-b" style="width:5%"></div>';
            htmlhead += '<div class="ui-block-c">Msg</div>';
            htmlhead += '</div>';

            $("#msgid").html('<li id="0" >' + htmlhead + '</li>');

            for (i = 0; i < commObjList.length; i++) {
                var commObj = commObjList[i];
                var commId = commObj.id;

                var htmlName = '<div class="ui-grid-b">';
                htmlName += '<div class="ui-block-a" style="width:30%"><strong>' + commObj.updatedatedisplay + '</strong></div>';
                htmlName += '<div class="ui-block-b" style="width:5%"> </div>';
                htmlName += '<div class="ui-block-c">' + commObj.data + '</div>';
                htmlName += '</div>';

                $("#msgid").append('<li id="' + commId + '" >' + htmlName + '</li>');

            }
        }


        var htmlAdmin = '<button id="configbtn"  >Configuration</button>';
        htmlAdmin += '<button id="invoicebtn"  >Billing Invoice</button>';

        $("#adminid").html(htmlAdmin);
        if (custObj.type == 99) {
            var htmlAdmin = '<button id="lockbtn" >Lock</button>';
            htmlAdmin += '<button id="serverbtn"  >Server</button>';
            htmlAdmin += '<button id="admsgbtn"  >Admin Msg</button>';
            $("#adminid").append(htmlAdmin);
        }

        $("#accheader").html("Customer Account");

        $("#myid").html(" "); //clear the field
        for (i = 0; i < accObjList.length; i++) {
            var accObj = accObjList[i];
            console.log(accObj);
            var accName = accObj.accountname;
            var accId = accObj.id;

            var htmlName = '<li id="' + accId + '"><a href="#">Start date:' + accObj.startdate;
            htmlName += '<br>Account:' + accName;
            htmlName += '<br>Current account balance=$' + accObj.balance.toFixed(2) + '</a></li>';

            $("#myid").append(htmlName);
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


        $("#clrbtn").click(function () {
            var accObjList = JSON.parse(accObjListStr);

            var accObj = null;
            for (i = 0; i < accObjList.length; i++) {
                var accObjTmp = accObjList[i];
                if (accObjTmp.type == 110) { //INT_TRADING_ACCOUNT
                    accObj = accObjTmp;
                    break;
                }
            }
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/acc/" + accObj.id + "/comm/remove",
                crossDomain: true,
                cache: false,
                beforeSend: function () {
                    $("#loader").show();
                },

                success: function (result) {
                    console.log(result);
                    window.location.href = "account_1.html";
                }
            });

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
                    $("#lockid").html(' ');
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

        $("#lock1btn").click(function () {

            $.ajax({
                url: iisurl + "cust/" + custObj.username + "/sys/lock",

                crossDomain: true,
                cache: false,
                success: function (resultLockObjList) {
                    console.log(resultLockObjList);
                    if (resultLockObjList == null) {
                        window.location.href = "#page-lock";
                    }
                    $("#lockid").html(' ');
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
                    $("#serverid").html(" ");
                    for (i = 0; i < resultServerList.length; i++) {
                        var srvObj = resultServerList[i];
                        var trStr = srvObj.lastServUpdateESTdate + '   ' + srvObj.serverName;
                        trStr += '<br>Maintance=' + srvObj.sysMaintenance;
                        trStr += '<br>' + srvObj.timerMsg;
                        trStr += '<br>RESTreq:' + srvObj.cntRESTrequest + '   Ex:' + srvObj.cntRESTexception;
                        trStr += '<br>InterReq:' + srvObj.cntInterRequest + '   Ex:' + srvObj.cntInterException;
                        var htmlName = ' ' + trStr + ' ';
                        $("#serverid").append('<li ></li>' + htmlName);
                    }
                    window.location.href = "#page-lock";
                }
            });
        });

        $("#admsgbtn").click(function () {
            var accObjList = JSON.parse(accObjListStr);
            var accObj = null;
            for (i = 0; i < accObjList.length; i++) {
                var accObjTmp = accObjList[i];
                if (accObjTmp.type == 140) { //INT_ADMIN_ACCOUNT = 140;
                    accObj = accObjTmp;
                    break;
                }
            }
            if (accObj == null) {
                window.location.href = "#page-index";
            }
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/acc/" + accObj.id + "/comm",

                crossDomain: true,
                cache: false,
                success: function (resultCommObjList) {
                    console.log(resultCommObjList);
                    if (resultCommObjList !== "") {
                        var commObjListStr = JSON.stringify(resultCommObjList, null, '\t');
                        console.log(commObjListStr);
                    } else {
                        window.location.href = "#page-index";
                        return;
                    }
                }
            });
        });


        $("#configbtn").click(function () {
            if (custObj.username.toUpperCase() == "GUEST") {
                alert("Not supproted feature for GUEST accont");
                return;
            }
        });
        $("#invoicebtn").click(function () {
            if (custObj.username.toUpperCase() == "GUEST") {
                alert("Not supproted feature for GUEST accont");
                return;
            }
        });


// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();





