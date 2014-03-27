module.exports = function(grunt) {
  grunt.registerTask('styleguide', [
    'string-replace:styleguide',
    'clean:styleguide',
    'copy:styleguide',
    'kss', // note: kss:styleguide fails here, otherwise I would use this convention for consistency
    'clean:styleguide_data_public'
  ]);
};