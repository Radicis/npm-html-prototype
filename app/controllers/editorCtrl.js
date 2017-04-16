'use strict';

angular.module('app').controller('EditorCtrl', function($scope, $element){

    var vm = this;

    var holder = document.getElementById($element[0].id).parentNode;

    holder.ondrop = function(e) {
        e.preventDefault();
        angular.forEach(e.dataTransfer.files, function(file){
            console.log('File(s) you dragged here: ', file.path);
        });
        return false;
    };


});