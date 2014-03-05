// rename:function() // http://stackoverflow.com/questions/15271121/how-can-i-rename-files-with-grunt-based-on-the-respective-files-parent-folder
module.exports = {
    styleguide: {
        expand: true,
        src: "<%= pkg.project.styleguide.template %>/public/*",
        dest: "<%= pkg.project.styleguide.dest %>/assets",
        flatten: true // prevent parent folders being copied as well
    }
}