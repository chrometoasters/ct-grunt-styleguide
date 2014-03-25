# Grunt: Styleguide <sup>v1.1.0</sup>

Chrometoaster's KSS Styleguide generator.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Terminology

* KSS - Knyle Style Sheets; if you're unfamiliar with KSS, please read our [docs](https://github.com/chrometoasters/ct-grunt-styleguide/blob/master/docs/kss/README.md)
* NPM - the Node Package Manager, installed with NodeJS

## Setup and Usage

### One-time setup, for all projects

#### Install KSS dependencies

1. In Terminal: `npm list kss -g`, to check whether you have the kss NPM package installed [[src](http://stackoverflow.com/questions/10972176/find-the-version-of-an-installed-npm-package)]
1. If KSS is `(empty)`:
    1. In Terminal: `sudo npm install -g kss`, to instruct NPM to install the KSS binary so that is available globally

#### Install KSS-Node dependencies

This project uses the NodeJS implementation of KSS, so you will also need to install `kss-node` from Github:

1. TODO: In Terminal: `???`, to check whether you have this installed
1. If not:
    1. In Terminal: `cd /path/to/github-clones`, to change to the directory where you store Git repositories that you clone
    1. In Terminal: `git clone https://github.com/chrometoasters/kss-node.git`, to clone our copy of `kss-node`
    1. In Terminal: `cd kss-node`, to change into the directory you just created
    1. In Terminal: `sudo npm install -g` - to instruct NPM to install the `kss-node` dependencies listed in `package.json`. The `-g` ('global') flag instructs OS X to copy the files to `/usr/local/lib/node_modules/kss/`

#### Install Grunt and its dependencies

1. If you haven't used Grunt before, please read [Set up Grunt dependencies](https://github.com/chrometoasters/frontend-grunt-boilerplate#set-up-grunt-dependencies).

### Every time you set up a new project

#### Install the KSS Grunt Task

1. In Terminal: `npm list bower -g`, to check whether you have the Bower NPM package installed [[src](http://stackoverflow.com/questions/10972176/find-the-version-of-an-installed-npm-package)]
1. If Bower is `(empty)`:
    1. In Terminal: `sudo npm install -g bower`, to install Bower
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to your project's theme folder
1. In Terminal: `bower install https://github.com/chrometoasters/ct-grunt-styleguide.git`, to install this Grunt task

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }


#### Install the KSS Grunt Task's dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to your project's theme directory
1. In Terminal: `sudo npm install`, to install the dependencies listed in `package.json`
1. SVN/Git ignore the generated folder: `node_modules`

#### Set up the KSS Grunt Task and customise for your project

1. Copy `Gruntfile.js` into your project's theme folder
1. Copy `grunt-tasks` into your project's theme folder; if this folder already exists you will need to manually merge the files contained within the `options` folder
1. Open `package.json` and edit the paths to suit your project; note that the `styleguide.src` folder must exist already, but the `styleguide.dest` folder will be created
1. Create a project template (eg `styleguide.php`) to import the Styleguide page, at the path you specified in `styleguide.page`

        // styleguide.php
        <!-- header code here -->
        <?php
            // START KSS STYLEGUIDE
            include( $_SERVER['DOCUMENT_ROOT'] . '/PATH/TO/PROJECT-THEME-FOLDER/STYLEGUIDE-DEST/index.php' );
            // END KSS STYLEGUIDE
        ?>
        <!-- footer code here -->

Note that the styleguide requires jQuery, so it your project header does not include this already you will need to add it.

### Every time you want to regenerate a styleguide

#### Run the Grunt

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`, to change to the project's theme folder
1. In Terminal: `grunt styleguide`, to run the Grunt task