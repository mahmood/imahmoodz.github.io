module.exports = function(grunt) {


  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'style.css': 'style.scss',       // 'destination': 'source'
        }
      }
    },
    watch: {
     css: {
     files: 'style.scss',
     tasks: ['sass'],
     options: {
     livereload: true,
     },
     },
    },

    autoprefixer: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('default', ['autoprefixer']);

};
