/*global
    angular
 */

(function(angular) {
    "use strict";

    angular.module("directives", []).

        directive("task", [
            function() {
                return {
                    restrict: "A",
                    scope: true,
                    templateUrl: "partials/task.html",
                    replace: true,
                    link: function(scope, element, attrs) {}
                };
            }
        ]).

        directive("taskView", [
            function() {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: "partials/task-view.html",
                    link: function(scope, element, attrs) {}
                };
            }
        ]);
}(angular));