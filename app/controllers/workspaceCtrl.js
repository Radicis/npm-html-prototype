'use strict';

angular.module('app').controller('WorkspaceCtrl', function($scope, WorkspaceService, StatusService, DialogService, electron, $rootScope){

    var vm = this;

    vm.saveWorkspace = function(){
        $rootScope.$broadcast('loading-started');
        WorkspaceService.saveWorkspace("testFoo", $scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        $rootScope.$broadcast('loading-done');
        // TODO: Return a promise and handle error case
    };

    vm.loadWorkspace = function(workspaceName){
        $rootScope.$broadcast('loading-started');
        WorkspaceService.loadWorkspace("testFoo", $scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        $rootScope.$broadcast('loading-done');
        // TODO: Return a promise and handle error case
    };

    vm.export = function(title){
        electron.dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(function(result){
            try {
                WorkspaceService.export(result[0], title);
                DialogService.info("Success", "Successfully Exported to: " + result[0]);
                StatusService.log("Successfully Exported to: " + result[0]);
                electron.shell.openItem(result[0] + "/" + title);
                electron.shell.beep();
            }
            catch(err){
                DialogService.error("A problem occurred while trying to export the files");
            }
        });
    };
});