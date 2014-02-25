  /* -------------------------------------------------------------------------------------

  GRUNT: Styleguide
  http://github.com/chrometoasters/ct-grunt-styleguide

  -------------------------------------------------------------------------------------*/

// JSHINT:
/*globals module:true, require:true */

module.exports = function(grunt) {

  "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

  /* -------------------------------------------------------------------------------------

  IMPORT CONFIGURATION FILES

  -------------------------------------------------------------------------------------*/

  var path =                  require('path');
  var gruntConfig =          './grunt-config';

  // Project configuration.
  grunt.initConfig({

    // this exposes things like <%= pkg.name %>
    pkg: grunt.file.readJSON('package.json'),

  /* -------------------------------------------------------------------------------------

  PROJECT SETTINGS
  This should be the only area which you need to edit.

  -------------------------------------------------------------------------------------*/

    project: {
      root:                           path.resolve(),
      name:                           'Project Name', // we could do this in package.json but that would make the Grunt less portable
      node_modules:                   'node_modules',
      banner:                         '',
      resources:                      '/PATH/TO/PROJECT-THEME-FOLDER',
      styleguide_inner_width:         '922px', // note that you may need to set a width on the theme/parent container as well
      // the following paths are relative to resources:
      designs:                        '',
      grunt_styleguide:               'vendor/ct-grunt-styleguide',
      styles:                         'css',
      styleguide:                     'styleguide',
      styleguide_themed:              '/demos/styleguide'
    },

  /* -------------------------------------------------------------------------------------

  CONFIGURE PLUGINS

  -------------------------------------------------------------------------------------*/

    // removes .svn files copied with public directory
    // https://github.com/hughsk/kss-node/issues/40
    clean: {
      styleguide_data: {
          src: [
              "<%= project.styleguide %>/data/*.html"
          ]
      },
      // delete the public folder created by kss, as our custom index.html references template/public rather than data/public
      // and keeping it creates an .svn conflict - refer https://github.com/hughsk/kss-node/issues/40
      // we also delete the stylesheet copies (which include tests) which have been created in styleguide/styles
      styleguide_data_public: {
          src: [
              "<%= project.styleguide %>/data/public",
              "<%= project.styleguide %>/styles/*.css",
              "!<%= project.styleguide %>/styles/styleguide.css"
          ]
      },
    },

    // rename:function() // http://stackoverflow.com/questions/15271121/how-can-i-rename-files-with-grunt-based-on-the-respective-files-parent-folder
    copy: {
      styleguide: {
        expand: true,
        src: "<%= project.grunt_styleguide %>/template/public/*",
        dest: "<%= project.styleguide %>/assets",
        //rename: function(dest, src) {
        //  return dest + src.replace(".tpl", "");
        //},
        flatten: true // prevent parent folders being copied as well
      }
    },

    // kss-node [kss_source_folder] [kss_output_source_folder] --template [kss_template_template_folder]
    // includePath: "/<%= project.root %>/resources/styles/css",
    // files // kss-grunt Gruntfile documentation is buggy, or I"m doing it wrong: https://github.com/t32k/grunt-kss/issues/1
    kss: {
      options: {
        template: "<%= project.root %>/<%= project.grunt_styleguide %>/template",
        includeType: "css" // "to override the automatic preprocessor detection, set this value to css|sass|scss|less|stylus"
      },
      files: {
        src: [
          "<%= project.root %>/<%= project.styles %>"
        ],
        dest: "<%= project.root %>/<%= project.styleguide %>/data"
      }
    },

    // this replaces the copy task
    'string-replace': {
      styleguide: {
        files: {
          '<%= project.styleguide %>/index.php' : '<%= project.grunt_styleguide %>/template/index.tpl.php'
        },
        options: {
          replacements: [
            {
              pattern: '{{PROJECT_DESIGNS_FOLDER}}',
              replacement: '<%= project.resources %>/<%= project.designs %>'
            }, {
              pattern: '{{PROJECT_STYLEGUIDE_FOLDER}}',
              replacement: '<%= project.resources %>/<%= project.styleguide %>'
            }, {
              pattern: '{{PROJECT_STYLEGUIDE_PAGE}}',
              replacement: '<%= project.styleguide_themed %>/'
            }, {
              pattern: '{{PROJECT_STYLEGUIDE_ASSETS_FOLDER}}',
              replacement: '<%= project.resources %>/<%= project.styleguide %>/assets'
            }, {
              pattern: '{{PROJECT_STYLEGUIDE_WIDTH}}',
              replacement: '<%= project.styleguide_inner_width %>'
            }, {
              pattern: '{{PROJECT_NAME}}',
              replacement: '<%= project.name %>'
            }
          ]
        }
      }
    }

  });

  /* -------------------------------------------------------------------------------------

  ENABLE PLUGINS

  -------------------------------------------------------------------------------------*/

  // Clear files and folders
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Copy files and folders
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Chrome extension
  // https://github.com/vladikoff/grunt-devtools
  grunt.loadNpmTasks('grunt-devtools');

  // Knyle Style Sheets living styleguide generator.
  // NOTE! kss needs to be a global installation, so package.json can't handle the dependency
  // Removed from package.json: "kss": "~0.3.6"
  // Manual install: npm install -g kss
  // Manual uninstall: cd /usr/local/lib/ | sudo npm uninstall kss
  grunt.loadNpmTasks('grunt-kss');

  // Replaces strings on files by using string or regex patterns.
  // Attempts to be a String.prototype.replace adapter task for your grunt project.
  grunt.loadNpmTasks('grunt-string-replace');


  /* -------------------------------------------------------------------------------------

  SET UP TASKS TO CALL LOADED PLUGINS USING THE SPECIFIED CONFIG
  Tasks are prefixed with 'tasks_' for legibilty.

  If updating this section, please also update 'Grunt Tasks' in README.md

  -------------------------------------------------------------------------------------*/

  // CSS tasks for watch
  grunt.registerTask('styleguide', [
    'string-replace:styleguide',
    'clean:styleguide_data',
    'copy:styleguide',
    'kss', // note: kss:styleguide fails here, otherwise I would use this convention for consistency
    'clean:styleguide_data_public'
  ]);

};
