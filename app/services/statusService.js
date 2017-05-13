angular.module("app").service("StatusService", function(){
    // Logs the message to the footer status area
    this.log = function(msg){
        var footer = document.getElementById("footer");
        footer.innerHTML = msg;
    }
});