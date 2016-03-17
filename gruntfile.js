module.exports = function(grunt) {

    grunt.initConfig({
        pkg: 'package.json',

        app: 'app/',
        reactBase: '<%= app%>harmony/',
        reactApp: '<%= reactBase%>',
        vanillaApp: './app/vanilla/',
        temp: 'temp/',
        product: 'product/',

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015', 'react']
            },
            files: {
                expand: true,
                cwd: '<%= reactBase%>',
                src: ['**/*.js', '**/*.jsx'],
                dest: '<%=temp%>',
                ext: '.js'
            }
        },

        copy: {
            product : {
                files: [{
                    '<%= product%>/index.html': './index.html'
                }, {
                    '<%= product%>/main.js': '<%= vanillaApp%>/main.js'
                }, {
                    '<%= product%>/style.css': '<%= app%>/style/style.css'
                }]
            }
        },

        browserify: {
            '<%= vanillaApp%>/main.js': '<%= temp%>**/*.js',
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
        },

        clean: {
            vanilla: {
                expand: true,
                src: '<%= vanillaApp%>'
            },

            temp: {
                expand: true,
                src: '<%= temp%>'
            }
        },

        watch: {
            scripts: {
                files: ['<%= reactApp%>/**/*.js', '<%= reactApp%>/**/*.jsx'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            },
            watchAgain: {
                files: ['./gruntfile.js'],
                options: {
                    spawn: false
                },
                tasks: ['watch']
            }
        },

        injector: {
            product: {
                options: {
                    ignorePath: 'product/',
                    addRootSlash: false
                },
                files: {
                    './<%= product%>/index.html': ['<%= product%>*.css', '<%= product%>*.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-injector');

    grunt.registerTask('build', ['clean:vanilla', 'babel', 'browserify', 'clean:temp']);
    grunt.registerTask('product', ['clean:vanilla', 'babel', 'browserify', 'copy:product', 'injector', 'clean:temp']);
};
