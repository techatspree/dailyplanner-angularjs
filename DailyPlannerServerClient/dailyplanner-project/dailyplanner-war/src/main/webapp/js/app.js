/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("dailyPlanner", [
            "controllers",
            "services",
            "directives",
            "filters"
        ])

        .factory("httpInterceptor", [
            "$q",
            "$window",
            "$log",

            function ($q, $window, $log) {
                return function (promise) {
                    return promise.then(
                        function (response) {
                            // success
                            var responseHeader;

                            responseHeader = response.headers();

                            if (response.data && responseHeader["content-type"].indexOf("text/html") !== -1) {
                                if (response.data.indexOf('<meta name="unauthorized" content="true">') !== -1) {
                                    $log.error("unauthorized");
                                    $window.location.reload();
                                    return $q.reject(response);
                                }
                            }

                            return response;
                        },
                        function (response) {
                            // error
                            return $q.reject(response);
                        }
                    );
                };
            }

        ])

        .config([
            "$httpProvider",

            function ($httpProvider) {
                $httpProvider.responseInterceptors.push("httpInterceptor");
            }
        ]);
}(angular));