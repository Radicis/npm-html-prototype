'use strict';

angular.module('app').controller('MainCtrl', function($scope, OutputService, WindowService, WorkspaceService, StatusService,$uibModal){

    var vm = this;

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

    vm.theme = "blackboard";

    vm.initEditors = function() {

        vm.htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
            mode: "xml",
            htmlMode: true,
            lineNumbers: true,
            scrollbarStyle: "overlay",
            theme: vm.theme,
            minHeight: 50,
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
        var start = new Date().getTime();
        OutputService.generate(vm.htmlEditor, vm.cssEditor, vm.jsEditor);
        var end = new Date().getTime();
        var time = end - start;
        StatusService.log("Output generated in " + time + "ms");
    };


    this.showSnippetMenu = function(){
        $uibModal.open({
            templateUrl: 'views/snippets.html',
            controller: 'MainCtrl'

        }).result.then(function(snippet) {
            console.log(snippet);
        });
    }


});