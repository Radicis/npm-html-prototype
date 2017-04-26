angular.module("app").service("SnippetService", function(electron, $uibModal){

    this.show = function(){
        $uibModal.open({
            templateUrl: 'views/snippets.html',
            controller: 'SnippetCtrl'
        });
    };

    this.create = function(){

    }


});