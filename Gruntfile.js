module.exports = function (grunt) {
    grunt.initConfig({

        'angular-builder': {
            options: {
                mainModule: 'bookshelf',
                externalModules: ['ngLodash', 'ui.router', 'ngAnimate', 'ngCookies',
                    'ui.bootstrap']
            },
            app: {
                src: ['static/app/*.js', 'static/app/**/*.js'],
                dest: 'static/build/js/app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    'static/build/js/app.min.js': ['static/build/js/app.annotated.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [
                    {
                        expand: true,
                        src: ['static/build/js/app.js'],
                        ext: '.annotated.js',
                        extDot: 'last'
                    }
                ]
            }
        },
        ngtemplates: {
            options: {
                module: "bookshelf"
            },
            app: {
                cwd: 'static/app',
                src: '**/*.html',
                dest: 'static/build/assets/app.templates.js'
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'static/build/assets/app.css': 'static/assets/css/app.sass'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'static/build/assets/app.min.css': ['static/build/assets/app.css']
                }
            }
        },
        clean: {
            app: ["static/build/js"],
            partials: ["static/build/js/app.js", "static/build/js/app.annotated.js"]
        }
    });

    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('release', ['clean:app', 'angular-builder', 'ngAnnotate', 'uglify',
        'clean:partials', 'sass', 'cssmin']);
    grunt.registerTask('heroku', ['clean:app', 'angular-builder', 'ngAnnotate', 'uglify',
        'clean:partials', 'sass', 'cssmin', 'ngtemplates']);
    grunt.registerTask('debug', ['clean:app', 'angular-builder', 'sass']);
    grunt.registerTask('templates', ['ngtemplates']);

};
