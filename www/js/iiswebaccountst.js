
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

        $("#accheader").html("Account "+accObj.accountname);

        var htmlhead  = '<div class="ui-grid-c">';
            htmlhead += '<div class="ui-block-a"><strong>Sym</strong></div>';
            htmlhead += '<div class="ui-block-b" style="width:20%">Sig</div>';
            htmlhead += '<div class="ui-block-c">Trend</div>';
            htmlhead += '<div class="ui-block-d">Percent</div>';
            htmlhead += '</div>';
            htmlhead += '</div>';        
        $("#myid").html('<li id="0" >' + htmlhead + '</li>');
        for (i = 0; i < stockObjList.length; i++) {
            var stockObj = stockObjList[i];
            console.log(stockObj);
//            var name = stockObj.symbol;
//            name += " TR:"+ stockObj.trsignal+" L:"+stockObj.longterm; 

//https://demos.jquerymobile.com/1.1.2/docs/content/content-grids.html
            var htmlName = '<div class="ui-grid-c">';
            htmlName += '<div class="ui-block-a"><strong>' + stockObj.symbol + '</strong></div>';
            var signal = "B";
            if (stockObj.trsignal == 1) {
                signal = "B";
            } else if (stockObj.trsignal == 2) {
                signal = "S";
            } else {
                signal = "E";
            }

            htmlName += '<div class="ui-block-b" style="width:20%">:' + signal + '</div>';
            htmlName += '<div class="ui-block-c">T: ' + stockObj.longterm + '</div>';

            var close = stockObj.afstockInfo.fclose;
            var preClose = stockObj.prevClose;
            var percent = 100 * (close - preClose) / preClose;
            var percentSt = percent.toFixed(2) + '%';
            htmlName += '<div class="ui-block-d">P: ' + percentSt + '</div>';
            
            htmlName += '</div>';

            var nameId = stockObj.id;
            $("#myid").append('<li id="' + nameId + '"><a href="#">' + htmlName + '</a></li>');
        }



        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var nameId = $(this).attr('id');
            console.log(nameId);
            if (nameId == 0) {
//                alert(nameId);
                return;
            }
            var sockId = nameId;
            var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr,
                'accId': accId, 'stockObjListStr': stockObjListStr, 'sockId': sockId, };
            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
            window.location.href = "accountsttr_1.html";
        });

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();





