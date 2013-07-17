/*global
    jasmine,
    describe, it, expect,
    beforeEach, afterEach,
    module, inject,
    angular
 */

(function (jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular) {
    "use strict";

    describe("services", function () {

        describe("localTaskStorage", function () {
            var windowMock, service, data;

            beforeEach(module("services"));

            beforeEach(function () {
                windowMock = {
                    JSON: {
                        stringify: jasmine.createSpy(),
                        parse: jasmine.createSpy()
                    },
                    localStorage: {
                        setItem: jasmine.createSpy(),
                        getItem: jasmine.createSpy()
                    }
                };

                module(function ($provide) {
                    $provide.value('$window', windowMock);
                });
            });

            beforeEach(inject(function (localTaskStorage) {
                service = localTaskStorage;
            }));

            beforeEach(function () {
                data = {};
                data.task = {
                    title: "new task",
                    description: "description",
                    duration: 15,
                    done: false
                };
            });

            it("should call localStorage.setItem()", function () {
                service.synchronize();
                expect(windowMock.localStorage.setItem.callCount).toEqual(1);
            });

            it("should call localStorage.getItem()", function () {
                service.fetchTasks();
                expect(windowMock.localStorage.getItem.callCount).toEqual(1);
            });

            it("should add a new task to localTaskStorage data model", function () {
                expect(service.data.length).toEqual(0);
                service.addNewTask(data.task);
                expect(service.data.length).toEqual(1);
            });

            it("should remove a task from localTaskStorage data model", function () {
                service.data.push(data.task);
                expect(service.data.length).toEqual(1);
                service.deleteTask(0);
                expect(service.data.length).toEqual(0);
            });
        });
    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));