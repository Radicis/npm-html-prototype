angular.module("app").service("StatusService", function(LibraryService){
    // Logs the message to the footer status area
    this.log = function(msg){
        var footer = document.getElementById("status");
        footer.innerHTML = msg;
    };

    this.updateActiveLibraries = function(){
        var str = "";
        angular.forEach(LibraryService.libraries, function(library){
            str+= library.name + "(";
            if(library.active)
                str+= "<span class='green'>On";
            else
                str+= "<span class='red'>Off";
            str+= "</span>) ";
        });

        var libraryIndicator = document.getElementById("library");
        libraryIndicator.innerHTML = str;

    };
});