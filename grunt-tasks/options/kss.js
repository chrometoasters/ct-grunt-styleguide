module.exports = {
  // kss-node [kss_source_folder] [kss_output_source_folder] --template [kss_template_template_folder]
  // includePath: "/<%= project_root %>/resources/styles/css",
  // files // kss-grunt Gruntfile documentation is buggy, or I"m doing it wrong: https://github.com/t32k/grunt-kss/issues/1
  options: {
    template: "<%= project_root %>/<%= pkg.project.styleguide.template %>",
    includeType: "css" // "to override the automatic preprocessor detection, set this value to css|sass|scss|less|stylus"
  },
  files: {
    src: [
      "<%= project_root %>/<%= pkg.project.styleguide.src %>"
    ],
    dest: "<%= project_root %>/<%= pkg.project.styleguide.dest %>/data"
  }
}