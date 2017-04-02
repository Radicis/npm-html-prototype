angular.module("app").service("StatusService", function(){

    this.log = function(msg){
        var footer = document.getElementById("footer");
        footer.innerHTML = msg;
    }

});