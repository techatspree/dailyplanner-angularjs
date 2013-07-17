/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("directives", []).

        directive("taskWrapper", [
            function () {
                return {
                    restrict: "E",
                    templateUrl: "partials/task-wrapper.html"
                };
            }
        ]);
}(angular));