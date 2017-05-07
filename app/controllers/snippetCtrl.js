'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, electron, SnippetService, $uibModalInstance, $uibModal, DialogService, StatusService){

    $scope.selected = {};

    $scope.init = function(){
        SnippetService.load().then(function(snippets){
            $scope.snippets = snippets;
        });
    };

    $scope.showCreate = function(){
        $uibModal.open({
            templateUrl: 'views/addSnippet.html',
            controller: 'SnippetCtrl'
        }).result.then(function(){
            // Refresh collection
            $scope.init();
        });
    };

    $scope.create = function(){
        if(!$scope.snipHTML || !$scope.snipName || !$scope.selected.category){
            DialogService.error("Please Enter Something!");
            return;
        }
        SnippetService.create($scope.snipName, $scope.selected.category.name,  $scope.snipHTML).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved snippet to local database");
        }, function(err){
            DialogService.error(err);
        });
    };

    $scope.showCreateCategory = function(){
        $uibModal.open({
            templateUrl: 'views/addCategory.html',
            controller: 'SnippetCtrl'
        }).result.then(function(){
            // Refresh collection
            $scope.init();
        });
    };

    $scope.createCategory = function(){
        if(!$scope.selected.categoryName){
            DialogService.error("Please Enter Something!");
            return;
        }
        SnippetService.createCategory($scope.selected.categoryName).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved category to local database");
        }, function(err){
            DialogService.error(err);
        });
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