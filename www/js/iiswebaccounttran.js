
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

        var trName = iisWebObj.trName;

        var tranObjListStr = iisWebObj.tranObjListStr;
        var tranObjList = JSON.parse(tranObjListStr);


        var close = stockObj.afstockInfo.fclose;
        var preClose = stockObj.prevClose;
        var percent = 100 * (close - preClose) / preClose;
        var percentSt = percent.toFixed(2) + '%';

        var stStr = 'Transaction Listing<br>';
        stStr += stockObj.stockname + '<br>' + stockObj.updateDateD + '<br>' +
                'Pre Cl:' + preClose + '  Close:' + close + '  Per:' + percentSt
        $("#0").html('<h1>' + stStr + '</h1>');

        $("#accheader").html(stockObj.symbol + " " + trName);

        var htmlhead  = '<div class="ui-grid-c">';
            htmlhead += '<div class="ui-block-a"  style="width:30%" ><strong>Date</strong></div>';
            htmlhead += '<div class="ui-block-b" style="width:10%" >Sig</div>';
            htmlhead += '<div class="ui-block-c">Price</div>';
            htmlhead += '<div class="ui-block-d">Share</div>';
            htmlhead += '</div>';        
        $("#myid").html('<li id="0" >' + htmlhead + '</li>');
        for (i = 0; i < tranObjList.length; i++) {
            var tranObj = tranObjList[i];
            console.log(tranObj);
            var nameId = tranObj.id;
//https://demos.jquerymobile.com/1.1.2/docs/content/content-grids.html
            var htmlName = '<div class="ui-grid-c">';
            htmlName += '<div class="ui-block-a"  style="width:30%" ><strong>' + tranObj.entrydatedisplay + '</strong></div>';
            var signal = "B";
            if (tranObj.trsignal == 1) {
                signal = "B";
            } else if (tranObj.trsignal == 2) {
                signal = "S";
            } else {
                signal = "E";
            }
            htmlName += '<div class="ui-block-b" style="width:10%" >:' + signal + '</div>';
            htmlName += '<div class="ui-block-c">P:' + tranObj.avgprice + '</div>';
            htmlName += '<div class="ui-block-d">S:' + tranObj.share + '</div>';
            htmlName += '</div>';

            $("#myid").append('<li id="' + nameId + '">' + htmlName + '</li>');

        }

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();
