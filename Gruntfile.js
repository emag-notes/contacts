module.exports = function(grunt) {

    'use strict';

    [
        'grunt-contrib-jst',
        'grunt-contrib-requirejs',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-contrib-connect'
    ].forEach(function(name) {
        grunt.loadNpmTasks(name);
    });

    grunt.initConfig({
        jst: {
            options: {
                processName: function(filename) {
                    return filename.match(/((?:mobile|pc)\/.*).html$/)[1];
                },
                processContent: function(src) {
                    return src.replace(/(^\s+|\s+$)/gm, '');
                },
                amd: true
            },
            pc: {
                files: {
                    'assets/js/jst/pc.js':
                    ['assets/js/templates/pc/*.html']
                }
            },
            mobile: {
                files: {
                    'assets/js/jst/mobile.js':
                    ['assets/js/templates/mobile/*.html']
                }
            }
        },

        requirejs: {
            options: {
                mainConfigFile: 'assets/js/require.config.js',
                baseUrl: './assets/js',
                paths: {
                    requirejs: 'vendor/require'
                },
                include: ['requirejs']
            },
            pc: {
                options: {
                    out: 'assets/js/dist/pc.min.js',
                    name: 'pc'
                }
            },
            mobile: {
                options: {
                    out: 'assets/js/dist/mobile.min.js',
                    name: 'mobile'
                }
            }
        },

        jasmine: {
            all: {
                options: {
                    outfile: 'test/index.html',
                    host: 'http://localhost:8000/'
                }
            }
        },

        watch: {
            jst: {
                files: ['assets/js/templates/**/*.html'],
                tasks: ['jst']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000
                }
            }
        }

    });

    grunt.registerTask('test:jasmine', ['connect', 'jasmine']);
    grunt.registerTask('default', ['connect', 'watch']);
};
