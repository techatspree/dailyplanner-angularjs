/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("dailyPlanner", [
        "controllers",
        "directives",
        "filters"
    ])

        .factory("httpInterceptor", [
            "$q",
            "$window",
            "$log",

            function ($q, $window, $log) {
                return {
                    "response": function (response) {
                        var responseHeaders;
                        responseHeaders = response.headers();
                        if (   responseHeaders["content-type"]
                            && responseHeaders["content-type"].indexOf("text/html") !== -1
                            && response.data
                            && response.data.indexOf('<meta name="unauthorized" content="true">') !== -1) {
                                $log.error("unauthorized");
                                $window.location.reload();
                                return $q.reject(response);
                        }
                        return response;
                    }
                };
            }
        ])

        .config([
            "$httpProvider",

            function ($httpProvider) {
                $httpProvider.interceptors.push("httpInterceptor");
            }
        ]);
}(angular));