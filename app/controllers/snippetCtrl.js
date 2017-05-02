'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, electron, SnippetService, $uibModalInstance,  DialogService, StatusService){

    $scope.init = function(){
        SnippetService.load().then(function(snippets){
            $scope.snippets = snippets;
        });
    };

    $scope.showCreate = function(){
        console.log("Showing create");
        SnippetService.showCreate();
    };

    $scope.create = function(){
        if(!$scope.snipHTML && !$scope.snipName){
            DialogService.error("Please Enter Something!");
            return;
        }
        SnippetService.create($scope.snipName, $scope.snipHTML).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved snippets to local database");
        });
    };

    $scope.select = function(snippet){
        electron.clipboard.writeText(snippet.join("\n"));
        StatusService.log("Snippet copied to clipboard");
    };

    $scope.delete = function(){

    };

    $scope.close = function () {
        $uibModalInstance.close(false);
    }

});