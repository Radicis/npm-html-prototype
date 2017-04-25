angular.module("app").service("DialogService", function(electron){

    this.info = function(title, msg){
        electron.dialog.showMessageBox({
            title: title,
            message: msg
        });
    };

    this.error = function(title, msg){
        electron.dialog.showErrorBox("Error", msg);
    };

});