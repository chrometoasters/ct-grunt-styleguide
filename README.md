# Grunt: Styleguide

Chrometoaster's KSS Styleguide generator.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Installation

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `bower install https://github.com/chrometoasters/ct-grunt-styleguide.git`

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }

## Usage

### Install Dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `sudo npm install`
1. SVN/Git ignore the generated folder: `node_modules`

### Customise for your project

1. Copy `Gruntfile.js` into your project's theme folder
1. Edit the `PROJECT SETTINGS` at the top of `Gruntfile.js` to suit your project
1. Create a project template to import the Styleguide page (this can be located in any folder)

        // your-styleguide-page.php
        <!-- header code here -->
        <?php
            // START KSS STYLEGUIDE
            include( $_SERVER['DOCUMENT_ROOT'] . '/PATH/TO/PROJECT-THEME-FOLDER/styleguide/index.php' );
            // END KSS STYLEGUIDE
        ?>
        <!-- footer code here -->

### Run the Grunt

1. If you haven't used Grunt before, please read [Set up Grunt dependencies](https://github.com/chrometoasters/frontend-grunt-boilerplate#set-up-grunt-dependencies).
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `grunt styleguide`

## TODO

1. Manage file paths so that it is possible to run the Grunt from within the vendor folder, rather than having to copy the Gruntfile into the parent directory
