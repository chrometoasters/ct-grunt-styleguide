# Grunt: Styleguide

Chrometoaster's KSS Styleguide generator.

**Please note: this plugin is optimised for internal Chrometoaster use. YMMV. **

## Installation

    bower install https://github.com/chrometoasters/ct-grunt-styleguide.git

## Usage

### Install Dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `sudo npm install`

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

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `grunt styleguide`

## TODO

1. Manage file paths so that it is possible to run the Grunt from within the vendor folder, rather than having to copy the Gruntfile into the parent directory
