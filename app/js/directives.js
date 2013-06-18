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
                    scope: {
                        task: "=",
                        toggleTaskStatus: "&",
                        deleteTask: "&"
                    },
                    templateUrl: "partials/task.html",
                    replace: true,
                    link: function(scope, element, attrs) {}
                };
            }
        ]);
}(angular));