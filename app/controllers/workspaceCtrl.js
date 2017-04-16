'use strict';

angular.module('app').controller('WorkspaceCtrl', function($scope, WorkspaceService, StatusService, DialogService){

    var vm = this;

    vm.saveWorkspace = function(){
        WorkspaceService.saveWorkspace("testFoo", $scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        // TODO: Return a promise and handle error case
    };

    $scope.loadWorkspace = function(workspaceName){

        WorkspaceService.loadWorkspace("testFoo", $scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        // TODO: Return a promise and handle error case
    };

    vm.export = function(title){
        electron.dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(function(result){
            WorkspaceService.export(result[0], title);
            DialogService.info("Success", "Successfully Exported to: " + result[0]);
            StatusService.log("Successfully Exported to: " + result[0]);
        });

    };
});