
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {


//            var iisWebSession = "iisWebSession";
//            var iisWebObjStr = window.localStorage.getItem(iisWebSession);
//            var iisWebObj = JSON.parse(iisWebObjStr);
//            var custObjStr = iisWebObj1.custObjStr;
//            var custObj = JSON.parse(custObjStr);
//            
            document.getElementById("txt-first-name").setAttribute('value', custObj.firstname);
            document.getElementById("txt-last-name").setAttribute('value', custObj.lastname);
            
            document.getElementById("txt-email-address-signup").setAttribute('value', custObj.email);
            document.getElementById("txt-password-signup").setAttribute('value', custObj.password);

//            document.getElementById("txt-first-name").setAttribute('value', 'firstname');
//            document.getElementById("txt-last-name").setAttribute('value', 'lastname');
//            
//            document.getElementById("txt-email-address-signup").setAttribute('value', 'email');
//            document.getElementById("txt-password-signup").setAttribute('value', 'password');

        });


//        var iisurl = "https://iiswebsrv.herokuapp.com/";
        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

        var iisWebObjStr = window.localStorage.getItem(iisWebSession);
        var iisWebObj = JSON.parse(iisWebObjStr);
//        console.log(iisWebObj);

        var iisurlStr = iisWebObj.iisurlStr;
        iisurl = iisurlStr;

        var custObjStr = iisWebObj.custObjStr;
        if (custObjStr == null) {
            window.location.href = "index.html";
        }
        var custObj = JSON.parse(custObjStr);
        var accObjListStr = iisWebObj.accObjListStr;
        var accObjList = JSON.parse(accObjListStr);

        var billObjListStr = iisWebObj.billObjListStr;
        var billObjList = JSON.parse(billObjListStr);


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



        function functionConfirm(msg, myYes, myNo, myOk) {
            var confirmBox = $("#confirm");
            confirmBox.find(".message").text(msg);
            confirmBox.find(".yes,.no,.ok").unbind().click(function () {
                confirmBox.hide();
                window.localStorage.setItem(iisMsgSession, "");
            });
            confirmBox.find(".yes").click(myYes);
            confirmBox.find(".no").click(myNo);
            confirmBox.find(".ok").click(myOk);
            confirmBox.show();
        }

        function functionAlertConfirm(msg, myYes, myNo, myOk) {
            var confirmBox = $("#alertconfirm");
            confirmBox.find(".message").text(msg);
            confirmBox.find(".yes,.no,.ok").unbind().click(function () {
                confirmBox.hide();
                window.localStorage.setItem(iisMsgSession, "");
            });
            confirmBox.find(".yes").click(myYes);
            confirmBox.find(".no").click(myNo);
            confirmBox.find(".ok").click(myOk);
            confirmBox.show();
        }

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    }
};
app.initialize();





