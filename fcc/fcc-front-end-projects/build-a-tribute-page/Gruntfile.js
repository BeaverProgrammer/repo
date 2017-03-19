module.exports = function (grunt) {
    grunt.initConfig({
        jshint: ['Gruntfile.js', 'index.js']
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', "jshint");
};
