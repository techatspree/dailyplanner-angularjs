"use strict";

function taskListController($scope) {
    $scope.tasks = [
        {
            title: "Task 1",
            description: "Task1 Beschreibung",
            duration: 120,
            done: false
        },
        {
            title: "Task 2",
            description: "",
            duration: 15,
            done: false
        },
        {
            title: "Task 2",
            description: "Task3 Beschreibung",
            duration: 40,
            done: false
        }
    ];
}