  /* -------------------------------------------------------------------------------------

  GRUNT: Boilerplate
  http://github.com/chrometoasters/ct-grunt-boilerplate

  http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html

  Prerequesites:
  (sudo) npm install glob

  -------------------------------------------------------------------------------------*/

// JSHINT:
/*globals module:true, require:true */

module.exports = function(grunt) {

  "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

  /* -------------------------------------------------------------------------------------

  LOAD PLUGINS AND TASKS

  -------------------------------------------------------------------------------------*/

  // https://github.com/sindresorhus/load-grunt-tasks
  // This module will read the dependencies/devDependencies/peerDependencies
  // in your package.json and load grunt tasks
  // that match the `grunt-*` pattern
  // Equivalent to require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt-tasks');

  var path = require('path'); // DS

  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  /* -------------------------------------------------------------------------------------

  IMPORT CONFIGURATION FILES

  -------------------------------------------------------------------------------------*/

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    project_root: path.resolve(),
    env: process.env
  };

  // paths are usually relative to Gruntfile.js, which may be in a theme folder rather than the document root
  // so path_from_document_root is used for PHP and CSS/JS includes
  config.pkg.project.path_from_document_root = config.project_root.split( config.pkg.project.document_root + '/' )[1];
  //grunt.log.write( 'test: ' + config.pkg.project.path_from_document_root );

  grunt.util._.extend(config, loadConfig('./grunt-tasks/options/'));

  grunt.initConfig(config);

};