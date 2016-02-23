module.exports = function(grunt) {

    grunt.initConfig({
        pkg: 'package.json',

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            files: {
                expand: true,
                src: './main.js',
                dest: 'vanilla'
            }
        },

        watch: {
            scripts: {
                files: ['./main.js'],
                tasks: ['babel'],
                options: {
                    spawn: false
                }
            },
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['watch']);
};
