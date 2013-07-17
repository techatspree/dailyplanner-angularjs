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
        ]).

        directive("taskView", [
            function () {
                return {
                    restrict: "E",
                    templateUrl: "partials/task-view.html"
                };
            }
        ]).

        directive("taskEditView", [
            function () {
                return {
                    restrict: "E",
                    templateUrl: "partials/task-edit-view.html",
                    link: function (scope, element) {
                        element.animate({ "opacity": "1" }, 200);
                    }
                };
            }
        ]).

        directive("taskDeleteView", [
            function () {
                return {
                    restrict: "E",
                    templateUrl: "partials/task-delete-view.html",
                    link: function (scope, element) {
                        var slideIn, slideOut, animationDuration, defaultAnimationDuration;

                        // default animation duration
                        defaultAnimationDuration = 200;

                        slideIn = function () {
                            element.animate({ "left": "0" }, animationDuration);
                        };

                        slideOut = function () {
                            element.animate({ "left": "100%" }, animationDuration);
                        };

                        scope.$on("showTaskDeleteView", function (event, duration) {
                            animationDuration = duration || defaultAnimationDuration;
                            slideIn();
                        });

                        scope.$on("hideTaskDeleteView", function (event, duration) {
                            animationDuration = duration || defaultAnimationDuration;
                            slideOut();
                        });
                    }
                };
            }
        ]);
}(angular));