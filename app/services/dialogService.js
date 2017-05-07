angular.module("app").service("DialogService", function(electron){

    this.info = function(title, msg){
        electron.dialog.showMessageBox({
            title: title,
            message: msg
        });
    };

    this.error = function(msg){
        electron.dialog.showErrorBox("Error", msg);
    };

    this.confirm = function(msg, callback){
        electron.dialog.showMessageBox({
            title: "Are you Sure?",
            message: msg,
            buttons: ['OK', 'Cancel']
        }, callback);
    }
});