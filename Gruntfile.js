/*
 * grunt-aliyun-oss
 * https://github.com/pocketdigi/grunt-aliyun-oss
 *
 * Copyright (c) 2016 pocketdigi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: ''
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        aliyun_oss: {
            default_options: {
                options: {
                    accessKeyId: 'xxxx',
                    secretAccessKey: 'xxxx',
                    endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
                    bucketName:'xxxx'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**/*','!**/*.html'],
                        dest:'loam/'
                    }
                ]
            }
        },

        // // Unit tests.
        // nodeunit: {
        //     tests: ['test/*_test.js']
        // }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    // grunt.registerTask('test', ['clean', 'aliyun_oss', 'nodeunit']);

    // By default, lint and run all tests.
    // grunt.registerTask('default', ['jshint', 'test']);
    grunt.registerTask('default', ['aliyun_oss:default_options']);

};
