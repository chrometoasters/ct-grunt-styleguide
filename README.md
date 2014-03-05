# Grunt: Styleguide <sup>v1.1.0</sup>

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

### Install KSS dependencies

1. In Terminal: `sudo npm install -g kss`
1. This will tell NPM (the Node Package Manager, installed with NodeJS) to install the KSS binary

### Install KSS-Node dependencies

1. Navigate to your local kss-node directory:
1. In Terminal: `cd /Users/Dan/github/kss-node/` (Windows: `cd ﻿C:\Files\Websites\GitHub\kss-node`)
1. `sudo npm install -g`
1. This will tell NPM (the Node Package Manager, installed with NodeJS) to install the kss-node dependencies. The `-g` ('global') flag tells OS X to copy the files to `/usr/local/lib/node_modules/kss/`

### Install KSS Grunt dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `sudo npm install`
1. SVN/Git ignore the generated folder: `node_modules`

### Set up the Grunt

1. Copy `Gruntfile.js` into your project's theme folder

### Customise for your project

1. Copy `grunt-tasks` into your project's theme folder; if this folder already exists you will need to manually merge the files contained within the `options` folder
1. Edit the paths in `package.json` to suit your project
1. Create a project template to import the Styleguide page (this can be located in any folder)

        // your-styleguide-page.php
        <!-- header code here -->
        <?php
            // START KSS STYLEGUIDE
            include( $_SERVER['DOCUMENT_ROOT'] . '/PATH/TO/PROJECT-THEME-FOLDER/STYLEGUIDE-DEST/index.php' );
            // END KSS STYLEGUIDE
        ?>
        <!-- footer code here -->

### Run the Grunt

1. If you haven't used Grunt before, please read [Set up Grunt dependencies](https://github.com/chrometoasters/frontend-grunt-boilerplate#set-up-grunt-dependencies).
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `grunt styleguide`

### KSS

If you're unfamiliar with KSS, please read our [docs](https://github.com/chrometoasters/ct-grunt-styleguide/docs/kss/README.md).