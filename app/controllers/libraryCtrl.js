'use strict';

angular.module('app').controller('LibraryCtrl', function($uibModalInstance, LibraryService){

    var vm = this;

    vm.libraries = LibraryService.libraries;

    vm.done = function(){
        $uibModalInstance.close(false);
    };

});