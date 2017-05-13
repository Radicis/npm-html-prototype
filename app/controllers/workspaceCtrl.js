'use strict';

angular.module('app').controller('WorkspaceCtrl', function($scope, WorkspaceService, StatusService, DialogService, electron, $rootScope){

    var vm = this;

    vm.saveWorkspace = function(){
        $rootScope.$broadcast('loading-started');
        WorkspaceService.saveWorkspace($scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        $rootScope.$broadcast('loading-done');
    };

    vm.loadWorkspace = function(workspaceName){
        $rootScope.$broadcast('loading-started');
        WorkspaceService.loadWorkspace(workspaceName, $scope.mC.htmlEditor, $scope.mC.cssEditor, $scope.mC.jsEditor);
        $rootScope.$broadcast('loading-done');
    };

    vm.export = function(title){
        $rootScope.$broadcast('loading-started');
        electron.dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(function(result){
            try {
                WorkspaceService.export(result[0], title);
                DialogService.info("Success", "Successfully Exported to: " + result[0]);
                StatusService.log("Successfully Exported to: " + result[0]);
                electron.shell.openItem(result[0] + "/" + title);
                $rootScope.$broadcast('loading-done');
            }
            catch(err){
                DialogService.error("A problem occurred while trying to export the files");
                $rootScope.$broadcast('loading-done');
            }
        }, function(){
            $rootScope.$broadcast('loading-done');
        });
    };

});