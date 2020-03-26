
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

        var close = stockObj.afstockInfo.fclose;
        var preClose = stockObj.prevClose;
        var percent = 100 * (close - preClose) / preClose;
        var percentSt = percent.toFixed(2) + '%';


        var stStr = 'Trading Model Transaction Listing<br>';
        stStr += stockObj.stockname + '<br>' + stockObj.updateDateD + '<br>' +
                'Pre Cl:' + preClose + '  Close:' + close + '  Per:' + percentSt
        $("#0").html('<h1>' + stStr + '</h1>');

        $("#accheader").html(" " + accObj.accountname + " " + stockObj.symbol);


        for (i = 0; i < trObjList.length; i++) {
            var trObj = trObjList[i];
            console.log(trObj);
            var nameId = trObj.id;
            if (trObj.trname == "TR_RSI") {
                continue;
            } else if (trObj.trname == "TR_NN1") {
                continue;
            }

//https://demos.jquerymobile.com/1.1.2/docs/content/content-grids.html
            var htmlName = '<div class="ui-grid-b">';
            var dispName = trObj.trname;
            if (trObj.trname == "TR_ACC") {
                dispName = "ACCOUNT";
            }

            htmlName += '<div class="ui-block-a" ><strong>' + dispName + '</strong></div>';
            var signal = "B";
            if (trObj.trsignal == 1) {
                signal = "B";
            } else if (trObj.trsignal == 2) {
                signal = "S";
            } else {
                signal = "E";
            }
            htmlName += '<div class="ui-block-b" style="width:20%">:' + signal + '</div>';
            var total = trObj.investment + trObj.balance;
            var totalSt = total.toFixed(2);
            htmlName += '<div class="ui-block-c">Total:' + totalSt + '</div>';
            htmlName += '</div>';

//            var trStr = '  L:' + trObj.longamount + ' LS:' + trObj.longshare + ' S:' + trObj.shortamount + ' SS:' + trObj.shortshare
//            htmlName += '<h3>' + trStr + '</h3>';

            var htmlBtn = '<div id="myidbtn"  data-role="controlgroup" data-type="horizontal" data-theme="a" style="font-size:0.7em; margin-left:auto; margin-right:auto;width:100%; ">';
            htmlBtn += '<a href="#" id="' + nameId + '" type="graph"  value="' + trObj.trname + '" data-icon="myicongraph" data-role="button" data-theme="a"></a>';
            htmlBtn += '<a href="#" id="' + nameId + '" type="table"  value="' + trObj.trname + '" data-icon="myicontable" data-role="button" data-theme="a"></a>';
            htmlBtn += '</div>';

            htmlName += htmlBtn;
//            htmlName += '<button id="' + nameId + '" data-icon="myicongraph" style="height: 35px; width: 35px; border: none; padding: 1px 1px " value="' + trObj.trname + '"></button>';
//            htmlName += '<button id="' + nameId + '" data-icon="myicontable" style="height: 35px; width: 35px; border: none; padding: 1px 1px " value="' + trObj.trname + '"></button>';
            if (trObj.trname == "TR_NN2") {
                htmlName += 'Signal by Neural Network AI Model';
            } else if (trObj.trname == "TR_ACC") {
                var link = trObj.linktradingruleid;
                var trObjlink = null;
                for (j = 0; j < trObjList.length; j++) {
                    var trObjtmp = trObjList[j];
                    if (link == trObjtmp.type) {
                        trObjlink = trObjtmp;
                        break;
                    }
                }

                if (trObjlink !== null) {
                    htmlName += 'Trading Signal is linking to ' + trObjlink.trname;
                }
            }

            $("#myid").append('<li id="' + nameId + '"><a href="#">' + htmlName + '</a></li>');

        }

        var htmlName = '<div class="ui-grid-b">';
        htmlName += '<div class="ui-block-a" ></strong></div>';
        htmlName += '<div class="ui-block-b" style="width:20%"></div>';

        htmlName += '<div class="ui-block-c"></div>';
        htmlName += '</div>';
        $("#myid").append('<li id="0">' + htmlName + '</li>');


        var buttonGraph = false;

        $("[id*=myidbtn] a").click(function () {
            buttonGraph = true;
            var type = $(this).attr('type')
            var trname = $(this).attr('value')
            if (type == "graph") {
                if (trname !== null) {
                    var symbol = stockObj.symbol;
                    symbol = symbol.replace(".", "_");
                    var resultURL = iisurl + "cust/" + custObj.username + "/acc/" + accId + "/st/" + symbol + "/tr/" + trname + "/tran/history/chart";
//                resultURL = "https://iiswebsrv.herokuapp.com/cust/guest/acc/3/st/hou_to/tr/tr_macd/tran/history/chart";
                    $("#spaceimage").attr("src", resultURL);

                    window.location.href = "#page_graph";
                }
            }
            if (type == "table") {
                if (trname !== null) {
                    var symbol = stockObj.symbol;
                    symbol = symbol.replace(".", "_");
                    var urlSt = iisurl + "cust/" + custObj.username + "/acc/" + accId + "/st/" + symbol + "/tr/" + trname + "/perf";
                    console.log(urlSt);
                    $.ajax({
                        url: urlSt,
                        crossDomain: true,
                        cache: false,
                        beforeSend: function () {
                            $("#loader").show();
                        },
                        success: function (resultPerfList) {
                            console.log(resultPerfList);
                            if (resultPerfList !== null) {
                                var PerfObj = resultPerfList[0];
                                var htmlName = '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" ><strong>' + PerfObj.updatedatedisplay + '</strong></div>';
                                htmlName += '<div class="ui-block-b" >' + "1 Yr perf result" + '</div>';
                                htmlName += '</div>';

                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" ><strong>' + 'investment: ' + PerfObj.investment.toFixed(2) + '</strong></div>';
                                htmlName += '<div class="ui-block-b" >' + " " + '</div>';
                                htmlName += '</div>';
                                htmlName += '<br><br>';
                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" >' + 'balance: ' + PerfObj.balance.toFixed(2) + '</div>';
                                htmlName += '<div class="ui-block-b" >' + 'netprofit: ' + PerfObj.netprofit.toFixed(2) + '</div>';
                                htmlName += '</div>';

                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" >' + 'rating: ' + PerfObj.rating.toFixed(2) + '</div>';
                                htmlName += '<div class="ui-block-b" >' + 'numtrade: ' + PerfObj.numtrade + '</div>';
                                htmlName += '</div>';
                                htmlName += '<br><br>';

                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" >' + 'numwin: ' + PerfObj.performData.numwin + '</div>';
                                htmlName += '<div class="ui-block-b" >' + 'numloss: ' + PerfObj.performData.numloss + '</div>';
                                htmlName += '</div>';

                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" >' + 'maxwin: ' + PerfObj.performData.maxwin.toFixed(2) + '</div>';
                                htmlName += '<div class="ui-block-b" >' + 'maxloss: ' + PerfObj.performData.maxloss.toFixed(2) + '</div>';
                                htmlName += '</div>';

                                htmlName += '<div class="ui-grid-a">';
                                htmlName += '<div class="ui-block-a" >' + 'holdtime: ' + PerfObj.performData.holdtime + '</div>';
                                htmlName += '<div class="ui-block-b" >' + 'maxholdtime: ' + PerfObj.performData.maxholdtime + '</div>';
                                htmlName += '</div>';

                                $("#myidperf").html('<li">' + htmlName + '</li>');
                                window.location.href = "#page_table";
                            }
                        }
                    });
                    window.location.href = "#page_table";
                }
            }
        });

        $("ul[id*=myid] button").click(function () {
            buttonGraph = true;
            var trname = $(this).attr('value');
            if (trname !== null) {
                var symbol = stockObj.symbol;
                symbol = symbol.replace(".", "_");
                var resultURL = iisurl + "cust/" + custObj.username + "/acc/" + accId + "/st/" + symbol + "/tr/" + trname + "/tran/history/chart";
//                resultURL = "https://iiswebsrv.herokuapp.com/cust/guest/acc/3/st/hou_to/tr/tr_macd/tran/history/chart";
                $("#spaceimage").attr("src", resultURL);

                window.location.href = "#page_graph";
            }
//            $.ajax({
//                url: "https://iiswebsrv.herokuapp.com/cust/guest/acc/3/st/hou_to/tr/tr_macd/tran/history/chart",
//                datatype: "binary",
//                beforeSend: function (xhr) {
//                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
//                },
//                success: function (image) {
//
//                    var imgBase64 = $.base64.encode(image);
//                    console.log(imgBase64);
//                    window.location.href = "#page_graph";
//                },
//                error: function (xhr, text_status) {
//                    console.log("An error again " + text_status);
//                }
//            });


        });


        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var nameId = $(this).attr('id');
            console.log(nameId);
            if (nameId == 0) {
//                alert(nameId);
                return;
            }
            if (buttonGraph == true) {
                buttonGraph = false;
                return;
            }

            var trObj = null;
            for (i = 0; i < trObjList.length; i++) {
                var trObjTmp = trObjList[i];
                if (trObjTmp.id == nameId) {
                    trObj = trObjTmp;
                    break;
                }
            }
            if (trObj == null) {
                return;
            }
            var trName = trObj.trname;
            var iisWebObj = {'custObjStr': custObjStr, 'accObjListStr': accObjListStr,
                'accId': accId, 'stockObjListStr': stockObjListStr, 'sockId': sockId,
                'trObjListStr': trObjListStr, 'trName': trName};

            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
            window.location.href = "accounttran_1.html";
        });

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    },
};
app.initialize();

