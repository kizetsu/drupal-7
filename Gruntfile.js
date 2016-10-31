module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        connect: {
            demo: {
                options: {
                    hostname: '127.0.0.1',
                    // hostname: 'localhost',
                    port: 8080,
                    base: 'demo',
                    keepalive: true,
                    // livereload: true,
                    // open: true,
                    // debug: true,
                    middleware: function (connect, options, middlewares) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            proxy,
                            connect.static(options.base[0]),
                            connect.directory(options.base[0])
                        ];
                    }
                },
                proxies: [
                    {
                        rewrite: {
                            '^/demo': ''
                        },
                        context: '/app/',
                        host: 'localhost',
                        port: 3001,
                        https: false,
                        xforward: false
                    }
                ]
            }
        },
        php: {
            dist: {
                options: {
                    port: 5000,
                    base: 'app',
                    keepalive: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-hapi');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('htmldemo', ['connect']);
    grunt.registerTask('phpdemo', ['php']);

};
