/*global
    jasmine,
    describe, it, expect,
    beforeEach, afterEach,
    module, inject,
    angular
 */

(function (jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular) {
    "use strict";

    describe("filters", function () {

        beforeEach(module("filters"));

        describe("durationFormat filter", function () {
            it("should format 150 minutes to '02h 30m'", inject(function ($filter) {
                var input, formattedInput;
                input = 150;
                formattedInput = "";
                formattedInput = $filter("durationFormat")(input);
                expect(formattedInput).toEqual("02h 30m");
            }));
        });

        describe("truncateCharacters filter", function () {
            it("should truncate string with 11 characters to string with 5 characters", inject(function ($filter) {
                var input, truncatedInput, chars;
                input = "lorem ipsum";
                truncatedInput = "";
                chars = 5;

                expect(input.length).toEqual(11);
                truncatedInput = $filter("truncateCharacters")(input, chars);
                // not 5 because the filter should append "..." to truncated strings
                expect(truncatedInput.length).toEqual(8);
            }));
        });
    });
}(jasmine, describe, it, expect, beforeEach, afterEach, module, inject, angular));