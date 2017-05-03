'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, electron, SnippetService, $uibModalInstance,  DialogService, StatusService){

    $scope.selected = {};

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
        if(!$scope.snipHTML || !$scope.snipName || !$scope.selected.category){
            DialogService.error("Please Enter Something!");
            return;
        }

        SnippetService.create($scope.snipName, $scope.selected.category.name,  $scope.snipHTML).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved snippets to local database");
        });
    };

    $scope.showCreateCategory = function(){
        SnippetService.showCreateCategory();
    };

    $scope.createCategory = function(){
      SnippetService.createCategory($scope.selected.category).then(function(response){
          $uibModalInstance.close(false);
          StatusService.log("Saved category to local database");
      })
    };

    $scope.select = function(snippet){
        try {
            electron.clipboard.writeText(snippet.join("\n"));
            DialogService.info("Snip!", "Snippet copied to clipboard");
            $scope.close();
        }
        catch(err){
            DialogService.error("Unable to write to the clipboard");
        }
    };

    $scope.formatSnip = function(snip){
        return snip.join("\n");
    };

    $scope.delete = function(){

    };

    $scope.close = function () {
        $uibModalInstance.close(false);
    }

});