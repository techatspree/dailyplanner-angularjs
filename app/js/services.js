/*global
    angular,
    localStorage,
    JSON
*/

(function(angular, localStorage, JSON) {
    "use strict";

    angular.module("Services", []).

        // Local Storage Services
        factory("LocalStorage", [

            function() {
                var dataModel;

                dataModel = JSON.parse(localStorage.getItem("tasks") || '[]');

                return {
                    getItems: function() {
                        return dataModel;
                    },

                    addItem: function(task) {
                        dataModel.push(task);
                        localStorage.setItem("tasks", JSON.stringify(dataModel));
                    },

                    editItem: function(task) {
                        var index = dataModel.indexOf(task);
                        if (index !== -1) {
                            dataModel[index] = task;
                            localStorage.setItem("tasks", JSON.stringify(dataModel));
                        }
                    },

                    deleteItem: function(task) {
                        var index = dataModel.indexOf(task);
                        if (index !== -1) {
                            dataModel.splice(index, 1);
                            localStorage.setItem("tasks", JSON.stringify(dataModel));
                        }
                    }
                };
            }
        ]);

}(angular, localStorage, JSON));
