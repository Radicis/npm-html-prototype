'use strict';

angular.module('app').controller('WindowCtrl', function(WindowService){

    var vm = this;

    // Closes the host electron window
    vm.closeWindow = function(){
        WindowService.close();
    };

    // Maximises the host electron window
    vm.maximiseWindow = function(){
        WindowService.maximise();
    };

    // Minimises the host electron window
    vm.minimiseWindow = function(){
        WindowService.minimise();
    };



});