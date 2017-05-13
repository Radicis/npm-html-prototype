'use strict';

angular.module('app').controller('LibraryCtrl', function($uibModalInstance, LibraryService){

    var vm = this;

    // Get the collection of libraries from the service
    vm.libraries = LibraryService.libraries;

    vm.done = function(){
        $uibModalInstance.close(false);
    };

});