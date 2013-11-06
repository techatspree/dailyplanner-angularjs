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

        describe("serverTaskStorage", function () {
            var service, resourceMock;

            beforeEach(inject(function (serverTaskStorage, $httpBackend) {
                service = serverTaskStorage;
                resourceMock = $httpBackend;

            }));

            it("should send GET request to '/dailyplanner/rest/plan'", function () {
                resourceMock.when('GET', 'http://server:80/dailyplanner/rest/plan').respond();
                service.getTasks();
                resourceMock.flush();
                resourceMock.verifyNoOutstandingExpectation();
                resourceMock.verifyNoOutstandingRequest();
            });

            it("should send POST request to '/dailyplanner/rest/plan'", function () {
                resourceMock.when('POST', 'http://server:80/dailyplanner/rest/plan').respond();
                service.saveTasks([]);
                resourceMock.flush();
                resourceMock.verifyNoOutstandingExpectation();
                resourceMock.verifyNoOutstandingRequest();
            });
        });

    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));