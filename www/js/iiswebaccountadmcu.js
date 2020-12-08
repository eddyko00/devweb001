
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
        var accObj = null;
        for (i = 0; i < accObjList.length; i++) {
            var accObjTmp = accObjList[i];
            if (accObjTmp.type == 140) { //INT_ADMIN_ACCOUNT = 140;
                accObj = accObjTmp;
                break;
            }
        }
        if (accObj == null) {
            window.location.href = "index.html";
        }



        var cuObjListStr = iisWebObj.cuObjListStr;
        var cuObjList = JSON.parse(cuObjListStr);
        if (cuObjList == null) {
            window.location.href = "index.html";
        }
        if (cuObjList.length != 1) {
            window.location.href = "index.html";
        }
        var cuObj = cuObjList[0];  // pick the first one

        $("#accheader").html("Admin Control");

        $("#myid").html(" "); //clear the field

        if (cuObjListStr !== "") {
            var cuObjList = JSON.parse(cuObjListStr);

            var htmlhead = '<div class="ui-grid-b">';
            htmlhead += '<div class="ui-block-a" style="width:30%"><strong>Date</strong></div>';
            htmlhead += '<div class="ui-block-b" style="width:5%"></div>';
            htmlhead += '<div class="ui-block-c">Msg</div>';
            htmlhead += '</div>';

            $("#myid").html('<li id="0" >' + htmlhead + '</li>');

            for (i = 0; i < cuObjList.length; i++) {
                var cuObj = cuObjList[i];
                var cuId = cuObj.id;

                var htmlName = '<div class="ui-grid-b">';
                htmlName += '<div class="ui-block-a" style="width:30%"><strong>' + cuObj.updatedatedisplay + '</strong></div>';
                htmlName += '<div class="ui-block-b" style="width:5%"> </div>';
                htmlName += '<div class="ui-block-c">' + cuObj.username
                        + ' First:' + cuObj.firstname
                        + ' Last:' + cuObj.lastname

                        + '<br>Type:' + cuObj.type
                        + ' Status:' + cuObj.status
                        + ' SubStatus:' + cuObj.substatus

                        + '<br>Balance:' + cuObj.balance
                        + ' AmountDue:' + cuObj.payment

                        + '</div>';
                htmlName += '</div>';

                $("#myid").append('<li id="' + cuId + '" >' + htmlName + '</li>');
            }
        }


        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var Id = $(this).attr('id');
            console.log(Id);
            if (Id === 0) {
//                alert(accId);
                return;
            }

            return;
//            var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr};
//            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
//            window.location.href = "#";
        });




        $("#removemsgidsubmit").click(function () {
            var msgid = document.getElementById("removemsgid").value;
            if (msgid === "") {
                window.location.href = "accountadm.html";
                return;
            }
            ///cust/{username}/acc/{accountid}/comm/remove/{id}
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/acc/" + accObj.id + "/comm/remove/" + msgid,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator
            function handleResult(result) {
                console.log(result);
                alert("Remove Message Id result: " + result);
                window.location.href = "accountadm_1.html";
            }
        });

        $("#accbalancesubmit").click(function () {
            var accbalance = document.getElementById("accbalance").value;
            if (accbalance === "") {
                window.location.href = "accountadm.html";
                return;
            }

            var customername = cuObj.username;
            var balance = accbalance;
            //"/cust/{username}/uisys/{custid}/cust/{customername}/update?substatus=&payment=&balance="
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/uisys/" + custObj.id + "/cust/" + customername
                        + "/update?balance=" + balance,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator
            function handleResult(result) {
                console.log(result);
                alert("Account Payment update result: " + result);
                window.location.href = "accountadmcu_1.html";
            }
        });





        $("#admclrbtn").click(function () {

            var accObjList = JSON.parse(accObjListStr);

            var accObj = null;
            for (i = 0; i < accObjList.length; i++) {
                var accObjTmp = accObjList[i];
                if (accObjTmp.type == 140) { //INT_ADMIN_ACCOUNT = 140;
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


// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    }
};
app.initialize();





