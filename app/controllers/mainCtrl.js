'use strict';

angular.module('app').controller('MainCtrl', function($scope, OutputService, WindowService, WorkspaceService, StatusService, DialogService, electron){

    var vm = this;

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


    var createOutput = function(){
        var start = new Date().getTime();
        OutputService.generate(vm.htmlEditor, vm.cssEditor, vm.jsEditor);
        var end = new Date().getTime();
        var time = end - start;
        StatusService.log("Output generated in " + time + "ms");
    };

    vm.initEditors = function() {

        vm.htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
            mode: "xml",
            htmlMode: true,
            lineNumbers: true,
            scrollbarStyle: "overlay",
            theme: vm.theme,
            minHeight: 50,
            height:"100%"
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

    vm.addStoredVendorScript = function(scriptName){

        var scriptFile = false;

        switch(scriptName){
            case "jquery": scriptFile = "Point to local jquery file or CDN";break;
            case "bootstrapJs": scriptFile = "Point to local or cdn";break;
            default:break;
        }

        // ensure bootstrap is always after jquery

        if(script)
            vm.vendorScripts.push(script);
    };

    vm.addCustomVendorScript = function(scriptFile){

        // create file inside vendor dir

        if(script)
            vm.customVendorScripts.push(script);
    };

    vm.addCustomVendorScriptCDN = function(cdnUrl){
        vm.customVendorScriptsCDN.push(cdnUrl);
    };

    vm.addStoredVendorCss = function(cssName){

        var cssFile = false;

        switch(cssName){
            case "bootstrapCss": cssFile = "Point to local or cdn";break;
            default:break;
        }

        if(cssFile)
            vm.vendorCss.push(script);
    };

    vm.addCustomVendorCss = function(cssFile){

        // create file inside css/vendor dir

        if(script)
            vm.customVendorCss.push(script);
    };

    vm.addCustomVendorCssCDN = function(cdnUrl){
        vm.customVendorCssCDN.push(cdnUrl);
    };


});