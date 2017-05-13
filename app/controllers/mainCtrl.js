'use strict';

angular.module('app').controller('MainCtrl', function($scope, electron, OutputService, DialogService, WindowService, StatusService, SnippetService, $rootScope, LibraryService, $uibModal){

    var vm = this;

    // listens for loading started and sets loading variable to true
    $scope.$on('loading-started', function() {
        vm.loading= true;
    });

    // listens for loading done and sets loading variable to false
    $scope.$on('loading-done', function() {
        vm.loading= false;
    });

    // Prevent default drag and drop listeners on the document
    document.addEventListener('dragover',function(event){
        event.preventDefault();
        return false;
    },false);

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    document.ondrop = function(e) {
        e.preventDefault();
        return false;
    };

    // Creates the output file
    vm.initOutputFile = function(){
        $rootScope.$broadcast('loading-started');
        var path = require('path');
        OutputService.init();
        document.getElementById('output').src = (path.join(__dirname, 'output', 'output.html'));
        $rootScope.$broadcast('loading-done');
    };

    vm.theme = "blackboard";

    vm.htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
        mode: "xml",
        htmlMode: true,
        lineNumbers: true,
        scrollbarStyle: "overlay",
        theme: vm.theme,
        minHeight: 50
    });

    vm.cssEditor = CodeMirror(document.getElementById("code-panel-css"), {
        mode: "css",
        lineNumbers: true,
        scrollbarStyle: "simple",
        theme: vm.theme,
        minHeight: 50
    });

    vm.jsEditor = CodeMirror(document.getElementById("code-panel-js"), {
        mode: "javascript",
        lineNumbers: true,
        scrollbarStyle: "simple",
        theme: vm.theme,
        minHeight: 50
    });

    vm.initFooter = function(){
        StatusService.updateActiveLibraries();
    };

    var timer;
    // time to wait before output function fires
    var time = 1000;

    vm.initTimer = function(){
        clearTimeout(timer);
        timer = setTimeout(doneTyping, time);
    };

    vm.clearTimer = function(){
        clearTimeout(timer);
    };

    var doneTyping = function () {
        createOutput();
    };

    // Generates the output in the preview pane
    var createOutput = function(){
        $rootScope.$broadcast('loading-started');
        // Create a time object to track the execution time
        var start = new Date().getTime();
        OutputService.generate(vm.htmlEditor, vm.cssEditor, vm.jsEditor);
        var end = new Date().getTime();
        var time = end - start;
        StatusService.log("Output generated in " + time + "ms");
        document.getElementById('output').contentDocument.location.reload(true);
        StatusService.updateActiveLibraries();
        $rootScope.$broadcast('loading-done');
    };

    vm.export = function(){
        $rootScope.$broadcast('loading-started');
        var title = "nwp";
        electron.dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(function(result){
            try {
                OutputService.export(result[0], title, vm.htmlEditor, vm.cssEditor, vm.jsEditor);
                $rootScope.$broadcast('loading-done');
            }
            catch(err){
                DialogService.error("A problem occurred while trying to export the files" + err);
                $rootScope.$broadcast('loading-done');
            }
        }, function(){
            $rootScope.$broadcast('loading-done');
        });
    };

    // shows the snippet modal
    vm.showSnippetMenu = function(){
        SnippetService.show();
    };

    // shows the library modal
    vm.showLibraryMenu = function(){
        $uibModal.open({
            templateUrl: 'views/libraries.html',
            controller: 'LibraryCtrl as vm'
        }).result.then(function(){
            createOutput();
        }, function(){createOutput();});
    };

});