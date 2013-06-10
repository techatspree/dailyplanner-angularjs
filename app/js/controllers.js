"use strict";

function TaskListController($scope) {
    $scope.tasks = [];

    $scope.addTask = function(title) {
        if (!title) { return; }

        $scope.tasks.push({
                title: title,
                description: "",
                duration: 0,
                done: false
        });

        $scope.newTaskTitle = null;
    };

    $scope.deleteTask = function(id) {
        $scope.tasks.splice(id, 1);
    };

    $scope.toggleTaskStatus = function(id) {
        $scope.tasks[id].done = !$scope.tasks[id].done;
    };
}
