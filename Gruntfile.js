module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        shell: {
            startServer: {
                options: {
                    stdout: true
                },
                command: 'npm start'
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/sass',
                    src: ['*.scss'],
                    dest: 'app/css',
                    ext: '.css'
                }],

                options: {
                    loadPath: [
                        'app/bower_components/bourbon/dist',
                        'app/bower_components/bootstrap-sass-official/assets/stylesheets'
                    ]
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/js/**/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
           options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
           },
           dist: {
               files: {
                   'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
               }
           }
        },

        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'app/js/**/*.js', 'test/**/*.js'],
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            }
        },

        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/bower_components/',
                        src: ['**/*.css'],
                        dest: 'app/sass/libs/',
                        rename: function(dest, src) {
                            return dest + src.replace(/([\w-]*)\.css$/, "_$1.scss");
                        }
                    }
                ]
            }
        },

        watch: {
            files: [
                '<%= jshint.files %>',
                'app/sass/**/*.scss', 
                'app/**/*.html'
            ],
            tasks: ['jshint', 'sasscompile'],
            options: {
                livereload: true
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['shell:startServer', 'watch']
            }
        }


    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('sasscompile', ['copy:css', 'sass']);
    grunt.registerTask('dev', ['concurrent:dev']);
    grunt.registerTask('build', ['concat', 'uglify']);

    grunt.registerTask('default', []);

};
