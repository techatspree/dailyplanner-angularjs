/*global
    jasmine,
    describe, it, expect,
    beforeEach, afterEach,
    module, inject,
    angular
 */

(function (jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular) {
    "use strict";

    describe("TaskListController", function () {
        var scope, controller, data;

        beforeEach(module("controllers"));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller("taskListController", { $scope: scope });
        }));

        beforeEach(function () {
            data = {};
            data.newTaskTitle = "new task";
            data.task = {
                title: "new task",
                description: "description",
                duration: 15,
                done: false
            };
        });


        it("should add a new task", function () {
            expect(scope.tasks.length).toEqual(0);

            scope.addNewTask(data.newTaskTitle);
            expect(scope.tasks.length).toEqual(1);
        });

        it("should remove a task", function () {
            scope.tasks.push(data.task);
            expect(scope.tasks.indexOf(data.task)).toEqual(0);

            scope.deleteTask(0);
            expect(scope.tasks.indexOf(data.task)).toEqual(-1);
        });

        it("should set a task done", function () {
            scope.tasks.push(data.task);
            expect(scope.tasks.indexOf(data.task)).toEqual(0);
            expect(scope.tasks[0].done).toEqual(false);

            scope.toggleTaskStatus(scope.tasks[0]);
            expect(scope.tasks[0].done).toEqual(true);
        });
    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));