angular.module("app").service("SnippetService", function($q, electron, $uibModal, $http, StatusService, DialogService){

    var fs = require('fs');
    var path = require('path');

    var dbPath = path.join(__dirname, 'snippets/snippets.json');

    this.load = function(){
        var def = $q.defer();
        $http.get(dbPath).then(function(json) {
            def.resolve(json.data.snippets);
        });
        return def.promise;
    };

    this.show = function(){
        $uibModal.open({
            templateUrl: 'views/snippets.html',
            controller: 'SnippetCtrl'
        });
    };

    this.showCreate = function(){
        $uibModal.open({
            templateUrl: 'views/addSnippet.html',
            controller: 'SnippetCtrl'
        });
    };

    this.create = function(name, snippet){
        var def = $q.defer();
        $http.get(dbPath).then(function(json){
            var snippets = json.data.snippets;
            var newSnip = {
                name: name,
                source: snippet.split('\n')
            };

            snippets.push(newSnip);

            var targetDir = path.join(__dirname, 'snippets');
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
            }

            fs.writeFile(dbPath, JSON.stringify(json.data), function(err) {
                if(err) {
                    DialogService.error("Unable to save snippets!");
                    return console.log(err);
                }
                def.resolve();
            });
        });
        return def.promise;
    };
});