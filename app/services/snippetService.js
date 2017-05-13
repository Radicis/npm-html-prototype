angular.module("app").service("SnippetService", function($rootScope, $q, electron, $uibModal, $http, DirectoryService){

    var fs = require('fs');
    var path = require('path');

    // Specifies the relative path to the json snippet db
    var dbPath = path.join(__dirname, 'snippets/snippets.json');

    // Loads the snippets from the json db
    this.load = function(){
        var def = $q.defer();
        var targetDir = path.join(__dirname, 'snippets');
        DirectoryService.verifyAndCreate(targetDir);

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

    // Displays the snippets modal
    this.show = function(){
        $uibModal.open({
            templateUrl: 'views/snippets.html',
            controller: 'SnippetCtrl as vm'
        }).result.then(function(){

        }, function(){});
    };

    // Creates a new snippet category using the given name
    // Rejects if the name already exists
    this.createCategory = function(name){
        var def = $q.defer();
        var targetDir = path.join(__dirname, 'snippets');
        DirectoryService.verifyAndCreate(targetDir);

        $http.get(dbPath).then(function(json){

            // Create a new category object and initialise an empty snippets array
            var newCategory = {
                name: name,
                snippets: []
            };

            // If the returned json object did not have a snippets array then initialise one
            if(!json.data.snippets){
                json.data = {snippets:[]};
            }

            var allCategories = json.data.snippets;

            var exists= false;

            // Iterate over all categories and find one with a matching name
            angular.forEach(allCategories, function(singleCategory){
                if(name === singleCategory.name){
                    exists = true;
                    def.reject("Category name already exists");
                }
            });

            if(!exists){
                allCategories.push(newCategory);
            }

            fs.writeFile(dbPath, JSON.stringify(json.data), function(err) {
                if(err) {
                    def.reject("Unable to save changes to Db!");
                }
                def.resolve();
            });
        });
        return def.promise;
    };


    // Creates a new snippet with the given name in the given category
    this.create = function(name, categoryName, snippet){
        var def = $q.defer();

        $http.get(dbPath).then(function(json){

            // Create a new snippet object
            var newSnip = {
                name: name,
                source: snippet.split('\n')
            };

            var allCategories = json.data.snippets;
            var found = false;

            // Iterate over all the categories until you find a matching name
            angular.forEach(allCategories, function(singleCategory){
                if(categoryName === singleCategory.name){
                    singleCategory.snippets.push(newSnip);
                    found = true;
                }
            });
            if(!found){
                def.reject("No Category Found");
            }

            var targetDir = path.join(__dirname, 'snippets');
            DirectoryService.verifyAndCreate(targetDir);
            fs.writeFile(dbPath, JSON.stringify(json.data), function(err) {
                if(err) {
                    def.reject("Unable to save changes to Db!");
                }
                def.resolve();
            });
        });
        return def.promise;
    };

    // Deletes a snippet
    this.delete = function(categoryName, snippetName){
        var def = $q.defer();
        $http.get(dbPath).then(function(json){
            var allCategories = json.data.snippets;
            // Iterate over all the categories until you find a matching name
            angular.forEach(allCategories, function(singleCategory){
                // Locate the category
                if(categoryName === singleCategory.name){
                    // Locate the snippet by name
                    angular.forEach(singleCategory.snippets, function(snippet, index){
                        if(snippetName = snippet.name){
                            // Remove from the array
                            console.log("removing", snippet);
                            singleCategory.snippets.splice(index, 1);
                            // Save the json
                            var targetDir = path.join(__dirname, 'snippets');
                            DirectoryService.verifyAndCreate(targetDir);
                            fs.writeFile(dbPath, JSON.stringify(json.data), function(err) {
                                if(err) {
                                    def.reject("Unable to save changes to Db!");
                                }
                                def.resolve();
                            });
                        }
                    });
                }
            });
        });
        return def.promise;
    }

});