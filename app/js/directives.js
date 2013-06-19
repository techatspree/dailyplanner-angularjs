/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("directives", []).

        constant("PARTIAL_PATH", "partials/").

        directive("task", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task-wrapper.html"
                };
            }
        ]).

        directive("taskView", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task-view.html"
                };
            }
        ]).

        directive("taskEditDialog", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task-edit-dialog.html",
                    link: function(scope, element, attrs) {

                        element.find("form input").blur(function() {
                            scope.$apply(function() {
                                scope.editTask(scope.task);
                            });
                        });

                        element.find("form").submit(function() {
                            scope.$apply(function() {
                                scope.$emit("hideTaskEditDialog", {});
                            });
                        });
                    }
                };
            }
        ]).

        directive("taskDeleteDialog", [
            "PARTIAL_PATH",
            "$timeout",

            function(PARTIAL_PATH, $timeout) {
                return {
                    restrict: "A",
                    scope: {
                        deleteTask: "&"
                    },
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task-delete-dialog.html",
                    link: function postLink(scope, element, attrs) {
                        var slideIn, slideOut, animationDuration;

                        animationDuration = 200;

                        slideIn = function() {
                            element.animate({ "left": "0" }, animationDuration);
                        };

                        slideOut = function() {
                            element.animate({ "left": "100%" }, animationDuration);
                        };

                        slideIn();

                        scope.hideTaskDeleteDialog = function() {
                            slideOut();
                            $timeout(function() {
                                scope.$emit("hideTaskDeleteDialog", {});
                            }, animationDuration);
                        };

                        scope.submitTaskDeleteDialog = function(task) {
                            scope.$emit("hideTaskDeleteDialog", {});
                            scope.$emit("hideTaskEditDialog", {});
                            scope.deleteTask(task);
                        };
                    }
                };
            }
        ]);
}(angular));