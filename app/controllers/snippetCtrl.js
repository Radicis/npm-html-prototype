'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, SnippetService, DialogService, electron){

    $scope.init = function(){
        SnippetService.load().then(function(snippets){
            $scope.snippets = snippets;
        });
    };

    $scope.showCreate = function(){
        console.log("Showing create");
        SnippetService.showCreate();
    };

    $scope.create = function(snippet){
        SnippetService.create(snippet);
    };

    $scope.delete = function(){

    };


});