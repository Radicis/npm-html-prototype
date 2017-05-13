angular.module("app").service("LibraryService", function(){

    this.libraries = [
        {name:'jQuery', active:false, jsSrc:"https://code.jquery.com/jquery-latest.js"},
        {name:'bootstrap', active:false, jsSrc:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js", cssSrc:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" }
    ];

    this.getCSS = function(){
        var code = "";
        angular.forEach(this.libraries, function(library){
            if(library.active && library.cssSrc){
                code+='\n\t<link rel="stylesheet" href="' + library.cssSrc + '"/>'
            }
        });
        return code;
    };

    this.getJS = function(){
        var code = "";
        angular.forEach(this.libraries, function(library){
            if(library.active && library.jsSrc){
                code+='\t<script src="' + library.jsSrc + '"></script>\n'
            }
        });
        return code;
    };
});