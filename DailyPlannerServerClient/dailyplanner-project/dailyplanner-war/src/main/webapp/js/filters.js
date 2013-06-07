/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("Filters", []).

        filter("durationFormat", [
            function() {
                return function(input) {
                    var output, hours, minutes;
                    hours = 0;
                    minutes = 0;
                    output = "";

                    if (input) {
                        if (input >= 60) {
                            hours = parseInt(input / 60, 10);
                        }

                        if (input > 0) {
                            minutes = input % 60;
                        }

                        output = (hours < 10) ? "0" + hours : hours;
                        output += "h";
                        output += " ";
                        output += (minutes < 10) ? "0" + minutes : minutes;
                        output += "m";
                    }

                    return output;
                };
            }
        ]).

        filter("truncateCharacters", [
            function() {
                return function(input, chars) {
                    if (isNaN(chars)) { return input; }

                    if (chars <= 0) { return ''; }

                    if (input && input.length >= chars) {
                        input = input.substring(0, chars);

                        return input + '...';
                    }

                    return input;
                };
            }
        ]);

}(angular));
