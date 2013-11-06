/*global
    jasmine,
    describe, it, expect,
    beforeEach, afterEach,
    module, inject,
    angular
 */

(function (jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular) {
    "use strict";

    describe("controllers", function () {

        beforeEach(module("controllers"));

        describe("taskListController", function () {
            var scope, controller, testData;

            beforeEach(inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller("taskListController", { $scope: scope });
            }));

            beforeEach(function () {
                testData = {};
                testData.newTaskTitle = "new task";
                testData.task = {
                    title: "new task",
                    description: "description",
                    duration: 15,
                    done: false
                };
            });

            it("should add a new task", function () {
                expect(scope.tasks.length).toEqual(0);

                scope.newTaskTitle = testData.newTaskTitle;
                scope.addNewTask();
                expect(scope.tasks.length).toEqual(1);
            });

            it("should remove a task", function () {
                scope.tasks.push(testData.task);
                expect(scope.tasks.indexOf(testData.task)).toEqual(0);

                scope.deleteTask(0);
                expect(scope.tasks.indexOf(testData.task)).toEqual(-1);
            });

            it("should set a task done", function () {
                scope.tasks.push(testData.task);
                expect(scope.tasks.indexOf(testData.task)).toEqual(0);

                expect(scope.tasks[0].done).toEqual(false);

                scope.toggleTaskStatus(testData.task);
                expect(scope.tasks[0].done).toEqual(true);
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));