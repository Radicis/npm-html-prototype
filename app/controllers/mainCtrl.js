'use strict';

angular.module('app').controller('MainCtrl', function($scope, OutputService, WindowService, WorkspaceService, StatusService, SnippetService, $rootScope){

    var vm = this;

    // listens for loading started and sets loading variable to true
    $scope.$on('loading-started', function(event, args) {
        vm.loading= true;
        console.log("loading");
    });

    // listens for loading done and sets loading variable to false
    $scope.$on('loading-done', function(event, args) {
        vm.loading= false;
        console.log("done loading");
    });

    // Prevent default drag and drop listeners on the document
    document.addEventListener('dragover',function(event){
        console.log("dragging");
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

    vm.initOutputFile = function(){
        console.log("initing");
        $rootScope.$broadcast('loading-started');
        var path = require('path');
        OutputService.init();
        document.getElementById('output').src = (path.join(__dirname, 'output', 'output.html'));
        $rootScope.$broadcast('loading-done');

    };

    vm.theme = "blackboard";

    vm.initEditors = function() {

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

    };

    // Setup time variables
    var timer;
    // time to wait in ms before launching search
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

    var createOutput = function(){
        $rootScope.$broadcast('loading-started');
        var start = new Date().getTime();
        OutputService.generate(vm.htmlEditor, vm.cssEditor, vm.jsEditor);
        var end = new Date().getTime();
        var time = end - start;
        StatusService.log("Output generated in " + time + "ms");
        document.getElementById('output').contentDocument.location.reload(true);
        $rootScope.$broadcast('loading-done');
    };

    vm.showSnippetMenu = function(){
        SnippetService.show();
    };

});