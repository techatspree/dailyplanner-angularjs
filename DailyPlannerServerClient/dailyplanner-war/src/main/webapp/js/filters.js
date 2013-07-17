/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("filters", []).

        filter("durationFormat", [
            function () {
                return function (input) {
                    var output, hours, minutes;

                    if (isNaN(input) || input === 0) { return; }

                    hours = parseInt(input / 60, 10);
                    output = (input < 600) ? "0" + hours.toString() : hours.toString();
                    output += "h ";

                    minutes = input % 60;
                    output += (input % 60 < 10) ? "0" + minutes.toString() : minutes.toString();
                    output += "m";

                    return output;
                };
            }
        ]).

        filter("truncateCharacters", [
            function () {
                return function (input, chars) {
                    if (isNaN(chars)) { return input; }

                    if (chars <= 0) { return ""; }

                    if (input && input.length >= chars) {
                        input = input.substring(0, chars);

                        return input + "...";
                    }

                    return input;
                };
            }
        ]);
}(angular));