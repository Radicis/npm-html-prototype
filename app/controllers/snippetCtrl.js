'use strict';

angular.module('app').controller('SnippetCtrl', function($scope, $rootScope, electron, SnippetService, $uibModalInstance, $uibModal, DialogService, StatusService){

    var vm = this;

    vm.selected = {};

    vm.init = function(){
        $rootScope.$broadcast('loading-started');
        SnippetService.load().then(function(snippets){
            vm.snippets = snippets;
            $rootScope.$broadcast('loading-done');
        });
    };

    vm.deleteSnippet = function(categoryName, snippetName){
        DialogService.confirm("Do you really want to delete this snippet?", function(buttonIndex){
            if(buttonIndex===0){
                SnippetService.delete(categoryName, snippetName).then(function () {
                    vm.init();
                }, function (err) {
                    DialogService.error(err);
                });
            }
        });
    };

    // Displays the create snippet modal
    vm.showCreate = function(){
        $uibModal.open({
            templateUrl: 'views/addSnippet.html',
            controller: 'SnippetCtrl as vm'
        }).result.then(function(){
            // Refresh collection
            vm.init();
        }, function(){});
    };

    // Created a snippet
    vm.create = function(){
        if(!vm.snipHTML || !vm.snipName || !vm.selected.category){
            DialogService.error("Please Enter Something!");
            return;
        }
        $rootScope.$broadcast('loading-started');
        SnippetService.create(vm.snipName, vm.selected.category.name,  vm.snipHTML).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved snippet to local database");
            $rootScope.$broadcast('loading-done');
        }, function(err){
            DialogService.error(err);
            $rootScope.$broadcast('loading-done');
        });
    };

    // Displays the create category modal
    vm.showCreateCategory = function(){
        $uibModal.open({
            templateUrl: 'views/addCategory.html',
            controller: 'SnippetCtrl as vm'
        }).result.then(function(){
            // Refresh collection
            vm.init();
        }, function(){});
    };

    // Creates a category
    vm.createCategory = function(){
        if(!vm.selected.categoryName){
            DialogService.error("Please Enter Something!");
            return;
        }
        $rootScope.$broadcast('loading-started');
        SnippetService.createCategory(vm.selected.categoryName).then(function(){
            $uibModalInstance.close(false);
            StatusService.log("Saved category to local database");
            $rootScope.$broadcast('loading-done');
        }, function(err){
            DialogService.error(err);
            $rootScope.$broadcast('loading-done');
        });
    };

    // Selects a snippet and copies its source into the clipboard
    vm.select = function(snippet){
        try {
            electron.clipboard.writeText(snippet.join("\n"));
            DialogService.info("Snip!", "Snippet copied to clipboard");
            vm.close();
        }
        catch(err){
            DialogService.error("Unable to write to the clipboard");
        }
    };

    vm.formatSnip = function(snip){
        return snip.join("\n");
    };

    // Closes the modal
    vm.close = function () {
        $uibModalInstance.close(false);
    }

});