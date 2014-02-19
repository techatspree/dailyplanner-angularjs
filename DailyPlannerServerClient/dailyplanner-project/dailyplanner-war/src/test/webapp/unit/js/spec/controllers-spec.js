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
                            return angular.copy(storage)
                        }
                    };
                }());

                controller = $controller("taskListController", {
                    $scope: scope,
                    serverTaskStorage: taskStorageMock
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
                expect(scope.newTaskTitle).toEqual(null);
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

                scope.toggleTaskStatus(testData.task, null);
                expect(scope.tasks[0].done).toEqual(true);
            });

            it("should save an edited task", function () {
                scope.tasks.push(testData.task);
                expect(scope.tasks.indexOf(testData.task)).toEqual(0);
                expect(taskStorageMock.getTasks().length).toEqual(0);

                scope.selectedTask = angular.copy(scope.tasks[0]);
                scope.selectedTask.index = 0;
                scope.selectedTask.valid = true;
                scope.selectedTask.title = "edited title";
                scope.selectedTask.description = "edited description";
                scope.selectedTask.duration = "30m";

                scope.saveTask();
                expect(scope.selectedTask).toEqual(null);
                expect(taskStorageMock.getTasks().length).toEqual(1);

                scope.tasks = taskStorageMock.getTasks();
                expect(scope.tasks[0].title).toEqual("edited title");
                expect(scope.tasks[0].description).toEqual("edited description");
                expect(scope.tasks[0].duration).toEqual(30);
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));