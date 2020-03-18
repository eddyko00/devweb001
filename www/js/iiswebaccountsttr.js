
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
        var accId = iisWebObj.accId;

        var accObj = null;
        for (i = 0; i < accObjList.length; i++) {
            var accObjTmp = accObjList[i];
            if (accObjTmp.id == accId) {
                accObj = accObjTmp;
                break;
            }
        }
        if (accObj == null) {
            window.location.href = "index.html";
        }

        var stockObjListStr = iisWebObj.stockObjListStr;
        var stockObjList = JSON.parse(stockObjListStr);
        var sockId = iisWebObj.sockId;
        console.log(sockId);

        var stockObj = null;
        for (i = 0; i < stockObjList.length; i++) {
            var stockObjTmp = stockObjList[i];
            if (stockObjTmp.id == sockId) {
                stockObj = stockObjTmp;
                break;
            }
        }
        if (stockObj == null) {
            window.location.href = "index.html";
        }
        var trObjListStr = iisWebObj.trObjListStr;
        var trObjList = JSON.parse(trObjListStr);

        var close = stockObj.afstockInfo.fclose;
        var preClose = stockObj.prevClose;
        var percent = 100 * (close - preClose) / preClose;
        var percentSt = percent.toFixed(2) + '%';
        var stStr = stockObj.stockname + '<br>' + stockObj.updateDateD + '<br>' +
                'Close:' + close + ' Pre Close:' + preClose + ' Percent:' + percentSt
        $("#0").html('<h1>' + stStr + '</h1>');

        $("#accheader").html(" " + accObj.accountname + " " + stockObj.symbol);

        for (i = 0; i < trObjList.length; i++) {
            var trObj = trObjList[i];
            console.log(trObj);

//https://demos.jquerymobile.com/1.1.2/docs/content/content-grids.html
            var htmlName = '<div class="ui-grid-b">';
            htmlName += '<div class="ui-block-a"><strong>' + trObj.trname + '</strong></div>';
            htmlName += '<div class="ui-block-b">tr:' + trObj.trsignal + '</div>';
            var total = trObj.investment + trObj.balance;
            var totalSt = total.toFixed(2);
            htmlName += '<div class="ui-block-c">Total:' + totalSt + '</div>';
            htmlName += '</div>';


            var trStr = 'L:' + trObj.longamount + ' LS:' + trObj.longshare + ' S:' + trObj.shortamount + ' SS:' + trObj.shortshare
            htmlName += '<p>' + trStr + '</p>';
            var nameId = trObj.id;
            $("#myid").append('<li id="' + nameId + '"><a href="#">' + htmlName + '</a></li>');
        }



        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var nameId = $(this).attr('id');
            console.log(nameId);
            if (nameId == 0) {
                alert(nameId);
                return;
            }
            var sockId = nameId;
            var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr,
                'accId': accId, 'stockObjListStr': stockObjListStr, 'sockId': sockId, };
            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
//            window.location.href = "accountsttr_1.html";
        });

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();





