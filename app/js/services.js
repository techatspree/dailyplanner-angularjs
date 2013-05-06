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
            "filterFilter",

            function(filter) {
                var dataModel, tasksCount;

                tasksCount = function() {
                    dataModel.state.remainingTasks = filter(dataModel.data, {done: false}).length || 0;
                    dataModel.state.completedTasks = filter(dataModel.data, {done: true}).length || 0;
                };

                // init model
                dataModel = {};
                dataModel.data = JSON.parse(localStorage.getItem("tasks") || '[]');
                dataModel.state = {};
                dataModel.state.selectedItem = null;
                dataModel.state.editMode = null;
                dataModel.state.deleteDialog = null;
                dataModel.state.remainingTasks = 0;
                dataModel.state.completedTasks = 0;
                tasksCount();

                return {

                    getModelState: function() {
                        return dataModel.state;
                    },

                    getItems: function() {
                        return dataModel.data;
                    },

                    addItem: function(task) {
                        dataModel.data.push(task);
                        localStorage.setItem("tasks", JSON.stringify(dataModel.data));
                        tasksCount();
                    },

                    editItem: function(task) {
                        var index = dataModel.data.indexOf(task);
                        if (index !== -1) {
                            dataModel.data[index] = task;
                            localStorage.setItem("tasks", JSON.stringify(dataModel.data));
                            tasksCount();
                        }
                    },

                    deleteItem: function(task) {
                        var index = dataModel.data.indexOf(task);
                        if (index !== -1) {
                            dataModel.data.splice(index, 1);
                            localStorage.setItem("tasks", JSON.stringify(dataModel.data));
                            tasksCount();
                        }
                    }
                };
            }
        ]);

}(angular, localStorage, JSON));
