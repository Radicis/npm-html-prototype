angular.module("app").service("SnippetService", function($q, electron, $uibModal, $http, StatusService, DialogService){

    var fs = require('fs');
    var path = require('path');

    var dbPath = path.join(__dirname, 'snippets/snippets.json');

    this.load = function(){
        var def = $q.defer();
        var targetDir = path.join(__dirname, 'snippets');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }

        fs.open(dbPath, "wx", function (err, fd) {
            if (err)
                def.reject("Unable to access local DB");
            fs.close(fd, function (err) {
                if (err)
                    def.reject("Unable to close local DB");
            });
        });

        $http.get(dbPath).then(function (json) {
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

    this.createCategory = function(name){
        var def = $q.defer();
        var targetDir = path.join(__dirname, 'snippets');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }

        $http.get(dbPath).then(function(json){

            var newCategory = {
                name: name,
                snippets: []
            };

            var allCategories;

            if(!json.data.snippets){
                json.data = {snippets:[]};
            }

            allCategories = json.data.snippets;

            var exists= false;
            angular.forEach(allCategories, function(singleCategory){
                if(name == singleCategory.name){
                    exists = true;
                    def.reject("Name already exists");
                }
            });

            if(!exists){
                allCategories.push(newCategory);
            }

            fs.writeFile(dbPath, JSON.stringify(json.data), function(err) {
                if(err) {
                    def.reject("Unable to save snippets!");
                }
                def.resolve();
            });
        });
        return def.promise;
    };


    this.create = function(name, categoryName, snippet){
        var def = $q.defer();

        console.log("Checking for", categoryName);

        $http.get(dbPath).then(function(json){

            var newSnip = {
                name: name,
                source: snippet.split('\n')
            };

            var allCategories = json.data.snippets;
            var found = false;
            angular.forEach(allCategories, function(singleCategory){

                console.log("Checking", categoryName, " against", singleCategory.name);
                if(categoryName == singleCategory.name){
                    singleCategory.snippets.push(newSnip);
                    found = true;
                }
            });
            if(!found){
                def.reject("No Category Found");
            }

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