'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, $rootScope, electron, SnippetService, $uibModalInstance, $uibModal, DialogService, StatusService){

    $scope.selected = {};

    $scope.init = function(){
        $rootScope.$broadcast('loading-started');
        SnippetService.load().then(function(snippets){
            $scope.snippets = snippets;
            $rootScope.$broadcast('loading-done');
        });
    };

    $scope.deleteSnippet = function(categoryName, snippetName){
        DialogService.confirm("Do you really want to delete this snippet?", function(buttonIndex){
            if(buttonIndex===0){
                SnippetService.delete(categoryName, snippetName).then(function () {
                    DialogService.info("Success", "Snippet was deleted successfully!");
                }, function (err) {
                    DialogService.error(err);
                });
            }
        });
    };

    $scope.showCreate = function(){
        $uibModal.open({
            templateUrl: 'views/addSnippet.html',
            controller: 'SnippetCtrl'
        }).result.then(function(){
            // Refresh collection
            $scope.init();
        }, function(){});
    };

    $scope.create = function(){
        if(!$scope.snipHTML || !$scope.snipName || !$scope.selected.category){
            DialogService.error("Please Enter Something!");
            return;
        }
        $rootScope.$broadcast('loading-started');
        SnippetService.create($scope.snipName, $scope.selected.category.name,  $scope.snipHTML).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved snippet to local database");
            $rootScope.$broadcast('loading-done');
        }, function(err){
            DialogService.error(err);
            $rootScope.$broadcast('loading-done');
        });
    };

    $scope.showCreateCategory = function(){
        $uibModal.open({
            templateUrl: 'views/addCategory.html',
            controller: 'SnippetCtrl'
        }).result.then(function(){
            // Refresh collection
            $scope.init();
        }, function(){});
    };

    $scope.createCategory = function(){
        if(!$scope.selected.categoryName){
            DialogService.error("Please Enter Something!");
            return;
        }
        $rootScope.$broadcast('loading-started');
        SnippetService.createCategory($scope.selected.categoryName).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved category to local database");
            $rootScope.$broadcast('loading-done');
        }, function(err){
            DialogService.error(err);
            $rootScope.$broadcast('loading-done');
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

    $scope.close = function () {
        $uibModalInstance.close(false);
    }

});