beforeEach(function () {
    jasmine.addMatchers({
        toContainText: function () {
            return {
                compare: function (actualText, expectedText) {
                    return {
                        pass: actualText.indexOf(expectedText) > -1,
                        get message() {
                            return 'Expected ' + actualText + ' to contain ' + expectedText;
                        }
                    };
                }
            };
        },
        toHaveClass: function (cls) {
            return {
                compare: function (element, cls) {
                    var haveClass = false;
                    if (element.hasClass) {
                        haveClass = element.hasClass(cls);
                    }
                    return {
                        pass: haveClass,
                        get message() {
                            return "Expected '" + angular.mock.dump(element) + "' to have class '" + cls + "'.";
                        }
                    };
                }
            };
        }
    });
});