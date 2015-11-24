module.exports = function (config) {
    config.set({
        preprocessors: {
            'static/app/**/*.html': ['ng-html2js'],
            'node_modules/angular-moment/angular-moment.js': ['browserify']
        },

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/build/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-bootstrap-npm/dist/angular-bootstrap-tpls.js',
            'node_modules/lodash/index.js',
            'node_modules/angular-scroll/angular-scroll.js',
            'node_modules/ng-lodash/build/ng-lodash.js',
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

        frameworks: ['jasmine', 'browserify'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-browserify'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
