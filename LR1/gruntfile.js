module.exports = function(grunt) {

    grunt.initConfig({
        pkg: 'package.json',

        reactBase: 'app/harmony/',
        reactApp: '<%= reactBase%>',
        vanillaApp: './app/vanilla/',
        cssVanillaApp: 'public/stylesheets',
        temp: 'temp/',

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            files: {
                expand: true,
                cwd: '<%= reactBase%>',
                src: ['**/*.js'],
                dest: '<%=temp%>',
                ext: '.js'
            }
        },

        copy: {
            css: {
                src: '<%= reactBase%>/css/*.css',
                dest: '<%= cssVanillaApp%>/style.css'
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
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean:vanilla', 'babel', 'browserify', 'clean:temp']);
};
