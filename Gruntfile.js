module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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

        watch: {
            files: ['<%= jshint.files %>', 'app/sass/**/*.scss'],
            tasks: ['jshint', 'sass'],
            options: {
                livereload: true
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', []);
    grunt.registerTask('build', ['concat', 'uglify']);

};
