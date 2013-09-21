"use strict";

function taskListController($scope) {
    $scope.tasks = [
        {
            title: "Joggen",
            description: "Lauf um dein Leben, Marty!",
            duration: 60,
            done: false
        },
        {
            title: "Sushi essen",
            description: "Nigiri, Maguro, Tamagoyaki",
            duration: 30,
            done: false
        },
        {
            title: "AngularJS coden",
            description: "AngularJS, the Superheroic JavaScript MVW Framework",
            duration: 300,
            done: false
        }
    ];
}