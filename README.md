# Grunt: Styleguide <sup>v1.1.0</sup>

Chrometoaster's KSS Styleguide generator.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Installation

1. In Terminal: `sudo npm install -g bower`, to install Bower
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to your project's theme folder
1. In Terminal: `bower install https://github.com/chrometoasters/ct-grunt-styleguide.git`, to install this Grunt task

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }

## Usage

### Install KSS dependencies

1. In Terminal: `sudo npm install -g kss`, to tell NPM (the Node Package Manager, installed with NodeJS) to install the KSS binary

### Install KSS-Node dependencies

This project uses the node port of KSS, so you will also need to install kss-node from Github.

1. In Terminal: `cd /path/to/github-clones`, to change to the directory where you store your Git clones
1. In Terminal: `git clone https://github.com/chrometoasters/kss-node.git`, to clone our fork of `kss-node`
1. In Terminal: `cd kss-node`, to change into the directory you just created
1. In Terminal: `sudo npm install -g` - to tell NPM (the Node Package Manager, installed with NodeJS) to install the `kss-node` dependencies listed in `package.json`. The `-g` ('global') flag tells OS X to copy the files to `/usr/local/lib/node_modules/kss/`

### Install KSS Grunt dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to your project's theme directory
1. In Terminal: `sudo npm install`, to install the `kss-node` dependencies listed in `package.json`
1. SVN/Git ignore the generated folder: `node_modules`

### Set up the Grunt

1. Copy `Gruntfile.js` into your project's theme folder

### Customise for your project

1. Copy `grunt-tasks` into your project's theme folder; if this folder already exists you will need to manually merge the files contained within the `options` folder
1. Open `package.json` and edit the paths to suit your project; note that the `styleguide.src` folder must exist already, but the `styleguide.dest` folder will be created
1. Create a project template (eg `styleguide.php`) to import the Styleguide page (this can be located in any folder)

        // styleguide.php
        <!-- header code here -->
        <?php
            // START KSS STYLEGUIDE
            include( $_SERVER['DOCUMENT_ROOT'] . '/PATH/TO/PROJECT-THEME-FOLDER/STYLEGUIDE-DEST/index.php' );
            // END KSS STYLEGUIDE
        ?>
        <!-- footer code here -->

### Run the Grunt

1. If you haven't used Grunt before, please read [Set up Grunt dependencies](https://github.com/chrometoasters/frontend-grunt-boilerplate#set-up-grunt-dependencies).
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to the project's theme folder
1. In Terminal: `grunt styleguide`, to run the Grunt task

### KSS

If you're unfamiliar with KSS, please read our [docs](https://github.com/chrometoasters/ct-grunt-styleguide/blob/master/docs/kss/README.md).