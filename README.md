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

### Install KSS dependencies

1. In Terminal: `sudo npm install -g kss`
1. This will tell NPM (the Node Package Manager, installed with NodeJS) to install the KSS binary

#### Install KSS-Node dependencies

1. Navigate to your local kss-node directory:
1. In Terminal: `cd /Users/Dan/github/kss-node/` (Windows: `cd ﻿C:\Files\Websites\GitHub\kss-node`)
1. `sudo npm install -g`
1. This will tell NPM (the Node Package Manager, installed with NodeJS) to install the kss-node dependencies. The 
`-g` ('global') flag tells OS X to copy the files to `/usr/local/lib/node_modules/kss/`

### Install KSS Grunt dependencies

1. Copy `package.json` into your project's theme folder
1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `sudo npm install`
1. SVN/Git ignore the generated folder: `node_modules`

### Set up the Grunt

1. Copy `Gruntfile.js` into your project's theme folder

### Customise for your project

1. Copy `ct-grunt-config.json` into your project's theme folder
1. Edit the paths in `ct-grunt-config.json` to suit your project
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

## What is KSS?

KSS is an acronym which stands for 'Knyle Style Sheets'. 'Knyle' is a combination of 'Kyle' + 'Neath'. 
Kyle Neath is the Design Director at Github. 
Read [Kyle's introduction to Knyle Style Sheets](http://warpspire.com/posts/kss/).

KSS involves adding structured comments to CSS files to generate a **Living Styleguide**. 
These comments create an easily navigable index, 
live HTML/CSS demos which demonstrate the available style variants, 
and a place to store any notes which would be useful to the client or fellow developers.

KSS Node was created by Kyle Neath ([kneath](https://github.com/kneath/)) 
and is maintained on [Github](https://github.com/kneath/kss).

## What is KSS Node?

KSS Node is a NodeJS implementation of KSS. 

KSS Node was created by Hugh Kennedy ([hughsk](https://github.com/hughsk/)) 
and is maintained in [Github](https://github.com/hughsk/kss-node).

## Benefits of using KSS

### Clarity:

* provides an overview of complex stylesheets suitable for clients and other developers
* provides a reference for developers returning to a project after a long break

### Efficiency:

* visualising stylesheets allows developers to see at a glance whether a style already exists,
before authoring new styles
* exposing modifiers encourages development of reusable components that can be skinned
* reused and resuable code = less code to download, less code to maintain
* ensure that styles render in full in MSIE6-9 by avoiding the 
[4095x selector limit in MSIE6-9](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx)
* automatic styleguide generation is many times more efficient than manually building a PDF or HTML styleguide, 
and being responsible for its maintenance

### Completeness:

* visual documention provides an easy way to check that there are no bugs, oversights, or redundant rules in the CSS

### Integration:

* HTML demos assist back-end developers and other front-end developers in troubleshooting integration issues, 
and identifying what is in 'the box of bits'
* Removes the risk of capturing in appropriate (eg JS-injected) markup when ripping HTML via eg Firebug

## Debugging common problems

1. Some modifiers are not output in the styleguide
  1. Check that the modifier is followed by a description: `.mymodifier - my description`
  1. Remove any empty lines from the KSS code
1. The Styleguide is generated but the Styleguide page is blank
  1. Navigate to the Styleguide homepage then select the desired page from the dropdown, 
this will eliminate the possibility that the desired index comment has been removed from the stylesheets
  1. Remove any empty lines from the end of the stylesheet files
1. There are duplicate entries in the styleguide
  1. Check that an SVN update has not created multiple copies of a conflicted file/stylesheet
1. The second dropdown menu is not populated
  1. Sections should be named as: `Styleguide 7` (not `Styleguide 7.`)
  1. Sub-sections should be named as: `Styleguide 7.1` (not `Styleguide 7.1.` or `Styleguide 7.1.0` 
which registers as a sub-sub-section)
  1. Sub-sub-sections should be named as: `Styleguide 7.1.1` (not `Styleguide 7.1.1.`)
1. Only the styleguide index page generates
  1. If retrofitting an older project that makes extensive use of `@import "foo.css";` in 'importer' stylesheets, 
you may need to target the `imported` folder, instead of the parent `styles`/`css` folder  

###Error: Cannot call method 'match' of undefined

This was caused by this malformed KSS comment:

    /*
    Markup:
    <section class="build-block-header">
        <div class="image"><!-- full-width background image --></div>
        <div class="container"><!-- fixed width wrapper --></div>
    </section>
    */

## Authoring KSS

### Create a Styleguide section

Sections are created with the text: `Styleguide N`, where 'N' is the number of the section.

This creates an entry in the topmost dropdown menu in your styleguide.

If your site can dynamically merge stylesheets, it's a good idea to have a separate stylesheet for each section of
the Styleguide. This makes it easy to find styles when viewing a Styleguide, 
and gives you a good structure for the Styleguide.

For example:

* typography.css = "Typography": `Styleguide 1`
* scaffolding.css = "Scaffolding": `Styleguide 2`
* forms.css = "Forms": `Styleguide 3`

Note that `Styleguide 0` is reserved for use by the Styleguide 'splash' page and should not be used.

#### Example:

The example below demonstrates the code that should appear at the top of your stylesheet. 

Please note that, within the KSS comment:

* multiline comment syntax is used
* the code is not indented
* the text after the opening comment will appear in the menu
* we include the name of the source file for easy debugging
* there is a short description
* there is no Markup block (we'll see this later)
* we finish with the TOC (Table of Contents) index, with no trailing period

```css
/*
Typography

src: typography.css

Text styles.

Styleguide  1
*/ 
```

### Create a Styleguide sub-section

Sub-sections are created with the text: `Styleguide N.n`, 
where 'N' is the number of the section, and 'n' is the number of the sub-section.

This creates an entry in the dropdown *below* the topmost dropdown menu in your styleguide.

Sub sections are useful for documenting components.

For example:

* forms.css - Styleguide 3
   * "Forms - Textareas" - `Styleguide 3.1` 
   * "Forms - Text fields" - `Styleguide 3.2`
   * "Forms - Select menus" - `Styleguide 3.3` 

#### Example:

The example code below demonstrates the code that you could use to document a component.

Please note that, within the KSS comment:

* multiline comment syntax is used
* the code is not indented, except for the Markup HTML, which is indented using **spaces** (rather than tabs)
* the text after the opening comment will appear in the menu
* there is a short description
* `Markup:` appears on its own line
* the HTML markup
   * is optional, but is best included, otherwise the Styleguide could make false assumptions 
about how widely styles are supported
   * has been wrapped in `<div class="content"></div>` because this is the way the styles have been defined
   * the HTML comments `<!-- START EXAMPLE -->` and `<!-- END EXAMPLE -->` demarcate the portion of the code 
that should be copied when integrating the code (ie `<div class="content"></div>` must wrap the example  
markup, but does not need to be included with every component).
   * can span multiple lines
   * cannot contain any blank lines
   * should include **one** instance of `class="{$modifiers}"`, meaning that your code should be able to be altered at a single point
   * will be displayed in the Styleguide both as source code and as rendered HTML
* the list of classes ('modifiers')
   * are preceded and followed by a blank line
   * each start with a period and are followed by space-dash-space then a short description of what the modifier does
   * will each be displayed in the Styleguide as an additional block of rendered HTML, for visual comparison
   * can string together multiple classes, but this does not mean that your CSS rules need to target all of these classes
* the actual CSS rules:
   * will only be included in the Styleguide if they were mentioned in the modifiers list 
      * the `.crazy` pink/orange class will not appear in the Styleguide, as it was not included in the modifier list
      * the first, classless `input` **will** appear in the Styleguide, as the 'Default' layout
* we finish with the TOC (Table of Contents) index, with no trailing period
* the KSS comments *will* make your stylesheet larger, but you should be using either manual or automated 
minification as part of your development flow, which means that these comments will be stripped from your 
production stylesheets
* the KSS comment precedes the code that it described; the generator does not actually mind where the KSS comment is, 
but for readability by developers, it is best to keep it close to the CSS source

```css
/*
Forms - Textfield

A textbox for data entry.

Markup: 
<div class="content">
  <!-- START EXAMPLE -->
  <div class="input-text">
    <input type="text" size="20" value="Textfield" class="{$modifiers}" />
  </div>
  <!-- END EXAMPLE -->  
</div>

.focus - indicates that the element has been focussed by the user
.invalid - indicates that the data entered into the input is invalid
.disabled - indicates that the textfield cannot be edited

Styleguide 3.1
*/ 

	.content .input-text input {
		color: black;
		padding: 5px;
		border: 1px solid black;
	}
	.content .input-text input.focus {
		border-color: yellow;
	}
	.content .input-text input.invalid {
		color: red;
		border-color: red;
	}
	.content .input-text input.disabled {
		color: grey;
		border-color: grey;
	}
	.content .input-text input.crazy {
		color: pink;
		border-color: orange;
	}
```

### Create a Styleguide sub-sub-section

Deeper sections can be created using the same approach as above, but using an additional period and numeral 
in the Styleguide index comment.

### Create a Styleguide placeholder

Placeholder styles can easily be created as follows. This allows styles to be filled in gradually, 
while understanding what is left to do.  

Note that modifiers cannot be combined, in this scenario.

```css
/*
Buttons (TODO)

Links, buttons etc

Markup:
<div class="styleguide-placeholder">
  <img src="/sites/all/themes/mysite/images/ui/placeholders/{$modifiers}.png" alt="{$modifiers}" title="{$modifiers}" />
  <div class="styleguide-overlay"></div>
</div>

.button-green - Green button
.button-purple - Purple button

Styleguide 9.9.
*/
```		

### Helper styles that are available

There are a handful of `styleguide-` name-spaced classes available for use when authoring your styleguide:

1. `.styleguide-reveal` - adds a light grey background color and an 8px bottom margin, can be nested
1. `.styleguide-reveal-bottomless` - as above, without the bottom margin
1. `.styleguide-reveal-light` - alternative with a lighter background colour
1. `.styleguide-block-20` - forces display block and a height of 20 pixels
1. `.styleguide-block-50` - forces display block and a height of 50 pixels
1. `.styleguide-clear` - clears preceding floats
1. `.styleguide-divider` - break an example in two, useful for explanatory headings
1. `.styleguide-nofloat` - disables floating on the element
1. `.styleguide-hidden` - hides the element

##Credits

* Thanks to Kyle Neath ([kneath](https://github.com/kneath/)) for inventing KSS.
* Thanks to Hugh Kennedy ([hughsk](https://github.com/hughsk/)) for his work on getting kss-node up and running.
* Thanks to my employer [Chrometoaster](http://www.chrometoaster.com), for allowing me time to work on this boilerplate, 
and their interest in new technologies such as KSS.

## TODO

1. Manage file paths so that it is possible to run the Grunt from within the vendor folder, rather than having to copy the Gruntfile into the parent directory
1. Update and copy over `styleguide.md`
