module.exports = {
  // removes .svn files copied with public directory
  // https://github.com/hughsk/kss-node/issues/40
  styleguide_data: {
      src: [
          "<%= pkg.project.styleguide.dest %>/data/*.html"
      ]
  },
  // delete the public folder created by kss, as our custom index.html references template/public rather than data/public
  // and keeping it creates an .svn conflict - refer https://github.com/hughsk/kss-node/issues/40
  // we also delete the stylesheet copies (which include tests) which have been created in styleguide/styles
  styleguide_data_public: {
      src: [
          "<%= pkg.project.styleguide.dest %>/data/public",
          "<%= pkg.project.styleguide.dest %>/styles/*.css",
          "!<%= pkg.project.styleguide.dest %>/styles/styleguide.css"
      ]
  }
}