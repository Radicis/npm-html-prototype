'use strict';

angular.module('app').controller('WorkspaceCtrl', function($scope, OutputService, WindowService, WorkspaceService, StatusService, DialogService, electron){


        var holder = document.getElementById('code-panel-html');

        holder.ondragover = function(){
            return false;
        };
        holder.ondragleave = holder.ondragend = function(){
            return false;
        };

        holder.ondrop = function(e) {
            e.preventDefault();
            angular.forEach(e.dataTransfer.files, function(file){
                console.log('File(s) you dragged here: ', file.path);
            });
            return false;
        };

        // Closes the host electron window
        $scope.closeWindow = function(){
            //TODO: Are you sure?
            WindowService.close();
        };

        // Maximises the host electron window
        $scope.maximiseWindow = function(){
            WindowService.maximise();
        };

        // Minimises the host electron window
        $scope.minimiseWindow = function(){
            WindowService.minimise();
        };


        $scope.saveWorkspace = function(){
            WorkspaceService.saveWorkspace("testFoo", $scope.htmlEditor, $scope.cssEditor, $scope.jsEditor);
            // TODO: Return a promise and handle error case
        };

        $scope.loadWorkspace = function(workspaceName){

            WorkspaceService.loadWorkspace("testFoo", $scope.htmlEditor, $scope.cssEditor, $scope.jsEditor);
            // TODO: Return a promise and handle error case
        };

        $scope.export = function(title){
            electron.dialog.showOpenDialog({
                properties: ['openDirectory']
            }).then(function(result){
                WorkspaceService.export(result[0], title);
                DialogService.info("Success", "Successfully Exported to: " + result[0]);
                StatusService.log("Successfully Exported to: " + result[0]);
            });

        };

        $scope.theme = "blackboard";

        // Toggles the theme from light to dark
        $scope.swapTheme = function(){
            if($scope.theme == "blackboard"){
                $scope.theme = "default";
            }
            else{
                $scope.theme = "blackboard";
            }

            // TODO:Change nav styles to match also

            $scope.initEditors();
        };


        $scope.layout = {
            menuPanel: true,
            codePanel: true,
            renderPanel: false
        };

        $scope.toggle = function(which) {
            $scope.layout[which] = !$scope.layout[which];
        };

        $scope.close = function(which) {
            $scope.layout[which] = true;
        };

        $scope.open = function(which) {
            $scope.layout[which] = false;
        };


        var createOutput = function(){
            var start = new Date().getTime();
            OutputService.generate($scope.htmlEditor, $scope.cssEditor, $scope.jsEditor);
            var end = new Date().getTime();
            var time = end - start;
            StatusService.log("Output generated in " + time + "ms");
        };

        $scope.initEditors = function() {

            $scope.htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
                mode: "xml",
                htmlMode: true,
                lineNumbers: true,
                scrollbarStyle: "overlay",
                theme: $scope.theme,
                minHeight: 50
            });

            $scope.cssEditor = CodeMirror(document.getElementById("code-panel-css"), {
                mode: "css",
                lineNumbers: true,
                scrollbarStyle: "simple",
                theme: $scope.theme,
                minHeight: 50
            });

            $scope.jsEditor = CodeMirror(document.getElementById("code-panel-js"), {
                mode: "javascript",
                lineNumbers: true,
                scrollbarStyle: "simple",
                theme: $scope.theme,
                minHeight: 50
            });
        };

        // Setup time variables
        var timer;
        // time to wait in ms before launching search
        var time = 1000;

        $scope.initTimer = function(){
            clearTimeout(timer);
            timer = setTimeout(doneTyping, time);
        };

        $scope.clearTimer = function(){
            clearTimeout(timer);
        };

        var doneTyping = function () {
            createOutput();
        };

        $scope.addStoredVendorScript = function(scriptName){

            var scriptFile = false;

            switch(scriptName){
                case "jquery": scriptFile = "Point to local jquery file or CDN";break;
                case "bootstrapJs": scriptFile = "Point to local or cdn";break;
                default:break;
            }

            // ensure bootstrap is always after jquery

            if(script)
                $scope.vendorScripts.push(script);
        };

        $scope.addCustomVendorScript = function(scriptFile){

            // create file inside vendor dir

            if(script)
                $scope.customVendorScripts.push(script);
        };

        $scope.addCustomVendorScriptCDN = function(cdnUrl){
            $scope.customVendorScriptsCDN.push(cdnUrl);
        };

        $scope.addStoredVendorCss = function(cssName){

            var cssFile = false;

            switch(cssName){
                case "bootstrapCss": cssFile = "Point to local or cdn";break;
                default:break;
            }

            if(cssFile)
                $scope.vendorCss.push(script);
        };

        $scope.addCustomVendorCss = function(cssFile){

            // create file inside css/vendor dir

            if(script)
                $scope.customVendorCss.push(script);
        };

        $scope.addCustomVendorCssCDN = function(cdnUrl){
            $scope.customVendorCssCDN.push(cdnUrl);
        };


    });