/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("directives", [])

        .constant("PARTIAL_PATH", "pages/partials/")

        .directive("task", [
            "PARTIAL_PATH",

            function (PARTIAL_PATH) {
                return {
                    restrict: "E",
                    templateUrl: PARTIAL_PATH + "task.html",
                    replace: true,
                    link: function (scope, element) {
                        var animationDuration;

                        animationDuration = 200;

                        scope.$watch("selectedTask", function () {
                            if (scope.selectedTask && scope.selectedTask.index === scope.$index) {
                                element.animate({ "height": "240px" }, animationDuration);

                            } else {
                                element.animate({ "height": "80px" }, animationDuration);
                            }
                        });
                    }
                };
            }
        ])

        .directive("taskDeleteView", [
            "PARTIAL_PATH",

            function (PARTIAL_PATH) {
                return {
                    restrict: "E",
                    templateUrl: PARTIAL_PATH + "task-delete-view.html",
                    replace: true,
                    link: function (scope, element) {
                        var slideIn, slideOut, animationDuration;

                        animationDuration = 200;

                        slideIn = function () {
                            element.animate({ "left": "50%" }, animationDuration);
                        };

                        slideOut = function () {
                            element.animate({ "left": "100%" }, animationDuration);
                        };

                        scope.$on("showTaskDeleteView", function () {
                            slideIn();
                        });

                        scope.$on("hideTaskDeleteView", function () {
                            slideOut();
                        });
                    }
                };
            }
        ])

        .directive("formValidationState", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        var formName = attrs.name;

                        scope.$watch(formName + ".$valid", function () {
                            scope.$emit(formName + "StateChanged", { "valid" : scope[formName].$valid });
                        });
                    }
                };
            }
        ]);
}(angular));