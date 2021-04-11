
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
        var tabName = "COMM";
        if (iisWebObj.tabName != null) {
            tabName = iisWebObj.tabName;
        }
        var CustNListStr = iisWebObj.CustNListStr;
        var CustNListCnt = iisWebObj.CustNListCnt;
        var commObjListStr = iisWebObj.commObjListStr;
        var yearStr = iisWebObj.yearStr;


        ///cust/{username}/uisys/{custid}/accounting/report?year=");
        $.ajax({
            url: iisurl + "/cust/" + custObj.username + "/uisys/" + custObj.id + "/accounting/report?year=" + yearStr,
            crossDomain: true,
            cache: false,
            beforeSend: function () {
                $("#loader").show();
            },
            error: function () {
                alert('Network failure. Please try again later.');
                window.location.href = "index.html";
            },
            success: function (resultRptObj) {
                console.log(resultRptObj);

                if (resultRptObj == null) {
                    var iisWebObj = {'custObjStr': custObjStr, 'iisurlStr': iisurlStr, 'accObjListStr': accObjListStr, 'commObjListStr': commObjListStr,
                        'CustNListStr': CustNListStr, 'CustNListCnt': CustNListCnt, 'tabName': tabName, 'yearStr': yearStr};
                    window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

                    window.location.href = "accountadm.html";

                }
                var reportObjStr = JSON.stringify(resultRptObj, null, '\t');
                var iisWebObj = {'custObjStr': custObjStr, 'iisurlStr': iisurlStr, 'accObjListStr': accObjListStr, 'commObjListStr': commObjListStr,
                    'CustNListStr': CustNListStr, 'CustNListCnt': CustNListCnt, 'tabName': tabName, 'yearStr': yearStr, 'reportObjStr': reportObjStr};
                window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));

                window.location.href = "accountadmrp.html";
            }
        });

    }
};
app.initialize();





