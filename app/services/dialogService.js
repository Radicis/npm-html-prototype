angular.module("app").service("DialogService", function(electron){

    // Displays an info messagebox with a given title and message
    this.info = function(title, msg){
        electron.dialog.showMessageBox({
            title: title,
            message: msg
        });
    };

    // Displays an error messagebox with a given message
    this.error = function(msg){
        electron.dialog.showErrorBox("Error", msg);
    };

    // Displays a confirmation messagebox and calls the provided callback with access to the users choice of 0 or 1
    this.confirm = function(msg, callback){
        electron.dialog.showMessageBox({
            title: "Are you Sure?",
            message: msg,
            buttons: ['OK', 'Cancel']
        }, callback);
    }
});