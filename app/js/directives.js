/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("Directives", []).

        constant("PARTIAL_PATH", "partials/").

        directive("task", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task.html"
                };
            }
        ]).

        directive("taskViewMode", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task_view.html"
                };
            }
        ]).

        directive("taskEditMode", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task_edit.html",
                    link: function(scope, element, attrs) {

                        element.find("form input").blur(function() {
                            scope.$apply(function() {
                                scope.editTask(scope.task);
                            });
                        });

                        element.find("form").submit(function() {
                            scope.$apply(function() {
                                scope.modelState.editMode = null;
                                scope.modelState.selectedItem = null;
                                scope.modelState.deleteDialog = null;
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
                        modelState: "=",
                        deleteTask: "&"
                    },
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task_delete_dialog.html",
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

                        scope.cancel = function() {
                            slideOut();

                            $timeout(function() {
                                scope.modelState.deleteDialog = null;
                            }, animationDuration);
                        };

                        scope.submit = function(task) {
                            scope.modelState.selectedItem = null;
                            scope.modelState.editMode = null;
                            scope.modelState.deleteDialog = null;

                            scope.deleteTask(task);
                        };
                    }
                };
            }
        ]);

}(angular));
