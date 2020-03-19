
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });

        var iisurl = "https://iiswebsrv.herokuapp.com/";
        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

        window.localStorage.setItem(iisWebSession, " ");
        window.location.href = "index.html";
    },
};
app.initialize();





