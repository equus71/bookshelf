/* jshint -W117 */
describe('Directive: bs-spinner', function () {
    var element, scope, compile,
        validTemplate = '<bs-spinner></bs-spinner>';

    function createDirective(template) {
        var elm;

        elm = compile(template || validTemplate)(scope);

        return elm;
    }

    beforeEach(function () {

        module('bookshelf.widgets');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    it('should render the spinner', function () {
        element = createDirective();
        return expect(element.html()).toBe('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
    });
});
