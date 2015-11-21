module.exports = function (config) {
    config.set({
        preprocessors: {
            'static/app/**/*.html': ['ng-html2js']
        },

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-bootstrap/ui-bootstrap.js',
            'node_modules/ng-tags-input/build/ng-tags-input.js',
            'node_modules/lodash/index.js',
            'node_modules/moment/moment.js',
            'node_modules/angular-moment/angular-moment.js',
            'static/app/test/matchers.js',
            'static/app/**/*.module.js',
            'static/app/**/*.js',
            'static/app/*.js',
            'static/app/**/*.html'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'static/app/'
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
