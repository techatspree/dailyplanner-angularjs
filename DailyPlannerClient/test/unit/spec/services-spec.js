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

        beforeEach(module("services"));

        describe("localTaskStorage", function () {
            var windowMock, service;

            beforeEach(function () {
                windowMock = {
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

            it("should call localStorage.setItem()", function () {
                service.saveTasks([]);
                expect(windowMock.localStorage.setItem.callCount).toEqual(1);
            });

            it("should call localStorage.getItem()", function () {
                service.getTasks();
                expect(windowMock.localStorage.getItem.callCount).toEqual(1);
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));