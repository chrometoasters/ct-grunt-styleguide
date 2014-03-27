// this replaces the copy task
module.exports = {
  styleguide: {
    files: {
      '<%= pkg.project.styleguide.dest %>/index.php' : '<%= pkg.project.styleguide.template %>/index.tpl.php',
      '<%= pkg.project.styleguide.src %>/styleguide.md' : '<%= pkg.project.styleguide.template %>/public/styleguide.md'
    },
    options: {
      replacements: [
        {
          pattern: '{{PROJECT_DESIGNS_FOLDER}}',
          replacement: '<%= pkg.project.styleguide.designs %>'
        }, {
          pattern: '{{PROJECT_STYLEGUIDE_FOLDER}}',
          replacement: '<%= pkg.project.path_from_document_root %><%= pkg.project.styleguide.dest %>'
        }, {
          pattern: '{{PROJECT_STYLEGUIDE_PAGE}}',
          replacement: '<%= pkg.project.path_from_document_root %><%= pkg.project.styleguide.page %>/'
        }, {
          pattern: '{{PROJECT_STYLEGUIDE_ASSETS_FOLDER}}',
          replacement: '<%= pkg.project.path_from_document_root %><%= pkg.project.styleguide.dest %>/assets'
        }, {
          pattern: '{{PROJECT_STYLEGUIDE_WIDTH}}',
          replacement: '<%= pkg.project.styleguide.width %>'
        }, {
          pattern: '{{PROJECT_NAME}}',
          replacement: '<%= pkg.project.name %>'
        }
      ]
    }
  }
}