module.exports = function (config) {
    config.set({

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
            'static/app/**/*.module.js',
            'static/app/**/*.js',
            'static/app/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
