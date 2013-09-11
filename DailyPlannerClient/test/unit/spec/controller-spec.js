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
            var scope, controller, taskStorageMock, testData;

            beforeEach(inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();

                taskStorageMock = (function () {
                    var storage = [];
                    return {

                        saveTasks: function (tasks) {
                            storage = tasks;
                        },
                        getTasks: function () {
                            return storage;
                        }
                    };
                }());

                controller = $controller("taskListController", {
                    $scope: scope,
                    localTaskStorage: taskStorageMock
                });
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
                var taskToDeleteIndex;

                scope.tasks.push(testData.task);
                expect(scope.tasks.indexOf(testData.task)).not.toEqual(-1);

                taskToDeleteIndex = scope.tasks.indexOf(testData.task);

                scope.deleteTask(taskToDeleteIndex);
                expect(scope.tasks.indexOf(testData.task)).toEqual(-1);
            });

            it("should set a task done", function () {
                var taskIndex;

                scope.tasks.push(testData.task);
                expect(scope.tasks.indexOf(testData.task)).not.toEqual(-1);

                taskIndex = scope.tasks.indexOf(testData.task);

                expect(scope.tasks[taskIndex].done).toEqual(false);

                scope.toggleTaskStatus(testData.task, null);
                expect(scope.tasks[taskIndex].done).toEqual(true);
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));