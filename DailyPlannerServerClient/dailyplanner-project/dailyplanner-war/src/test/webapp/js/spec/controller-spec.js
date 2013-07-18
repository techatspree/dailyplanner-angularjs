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
            var scope, controller, taskStorageMock, data;

            beforeEach(inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();

                taskStorageMock = (function () {
                    return {
                        data: [],
                        synchronize: function () {},
                        fetchTasks: function () {},
                        addNewTask: function (newTask) {
                            this.data.push(newTask);
                        },
                        deleteTask: function (taskIndex) {
                            this.data.splice(taskIndex, 1);
                        }
                    };
                }());

                controller = $controller("taskListController", {
                    $scope: scope,
                    localTaskStorage: taskStorageMock
                });
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
                expect(scope.tasks.data.length).toEqual(0);
                scope.addNewTask(data.newTaskTitle);
                expect(scope.tasks.data.length).toEqual(1);
            });

            it("should remove a task", function () {
                scope.tasks.data.push(data.task);
                expect(scope.tasks.data.indexOf(data.task)).toEqual(0);

                scope.deleteTask(scope.tasks.data.indexOf(data.task));
                expect(scope.tasks.data.indexOf(data.task)).toEqual(-1);
            });

            it("should set a task done", function () {
                scope.tasks.data.push(data.task);
                expect(scope.tasks.data.length).toEqual(1);
                expect(scope.tasks.data[scope.tasks.data.indexOf(data.task)].done).toEqual(false);

                scope.toggleTaskStatus(data.task);
                expect(scope.tasks.data[scope.tasks.data.indexOf(data.task)].done).toEqual(true);
            });

            it("should edit a task", function () {
                var taskToEditIndex;

                scope.tasks.data.push(data.task);
                expect(scope.tasks.data.length).toEqual(1);

                taskToEditIndex = scope.tasks.data.indexOf(data.task);
                expect(taskToEditIndex).toEqual(0);
                expect(scope.tasks.data[taskToEditIndex].duration).toEqual(15);

                scope.taskToEdit = angular.copy(scope.tasks.data[taskToEditIndex]);
                scope.taskToEdit.duration = "1h30m";

                scope.saveEditedTask(taskToEditIndex);

                expect(scope.taskToEdit).toBeNull();
                expect(scope.tasks.data[taskToEditIndex].duration).toEqual(90);
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));