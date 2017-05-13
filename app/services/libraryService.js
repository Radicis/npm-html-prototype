'use strict';

angular.module("app").service("LibraryService", function(){

    // Collection of external libraries
    this.libraries = [
        {name:'jQuery', active:false, jsSrc:"https://code.jquery.com/jquery-latest.js"},
        {name:'Bootstrap', active:false, jsSrc:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js", cssSrc:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" },
        {name:'Angular', active:false, jsSrc:"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"}
    ];

    // Returns a formatted string containing the CSS cdn links
    this.getCSS = function(){
        var code = "";
        angular.forEach(this.libraries, function(library){
            if(library.active && library.cssSrc){
                code+='\n\t<link rel="stylesheet" href="' + library.cssSrc + '"/>'
            }
        });
        return code;
    };

    // Returns a formatted string containing the JS cdn links
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