"use strict";

function TaskListController($scope) {
    $scope.tasks = [
        {
            title: "Task 1",
            description: "Beschreibung Task 1 ...",
            duration: 30,
            done: false
        },
        {
            title: "Task 2",
            description: "Beschreibung Task 2 ...",
            duration: 20,
            done: true
        },
        {
            title: "Task 3",
            description: "Beschreibung Task 3 ...",
            duration: 15,
            done: false
        }
    ];
}

// inject needed services
TaskListController.$inject = ["$scope"];
