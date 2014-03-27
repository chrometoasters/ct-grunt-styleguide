<?php
/*
    Chrometoaster Styleguide
    Exported to styleguide/index.php

    This file acts as a conduit between the project template and the KSS template.
    It handles the tracking of the URL vars and populates placeholders within the KSS template.

    {{UPPERCASE}} vars are replaced by grunt-tasks/options/string-replace.js
    Note that Grunt only replaces the first instance of each var.
*/

    function styleguideHTML() {

        $styleguide_generated_path = '/{{PROJECT_STYLEGUIDE_FOLDER}}/data/';
        $styleguide_section = isset($_GET['section']) ? $_GET['section'] : ''; // &section=['', or '1', '2', '3' etc]

        if ( $styleguide_section ) {
            $source = $_SERVER['DOCUMENT_ROOT'] . $styleguide_generated_path . 'section-' . $styleguide_section . '.html';
        }
        else {
            $source = $_SERVER['DOCUMENT_ROOT'] . $styleguide_generated_path . 'index.html';
        }

        $content = file_get_contents( $source );

        // These replacements are made in the imported index.html used by the KSS generator
        $replacements = array(
            "[{SITE_NAME}]" => '{{PROJECT_NAME}}',
            "[{STYLEGUIDE_PATH}]" => '/{{PROJECT_STYLEGUIDE_PAGE}}', // fwd slash added here as it can't be in package.json due to this being used to create a folder
            "[{STYLEGUIDE_ASSETS_PATH}]" => '/{{PROJECT_STYLEGUIDE_ASSETS_FOLDER}}', // fwd slash added here as it can't be in package.json due to this being used to create a folder
            "[{STYLEGUIDE_DESIGNS_PATH}]" => '{{PROJECT_DESIGNS_FOLDER}}',
            "[{STYLEGUIDE_WIDTH}]" => '{{PROJECT_STYLEGUIDE_WIDTH}}'
        );

        $content = strtr( $content, $replacements );

        if ( ! $styleguide_section ) {
            echo ('<div id="styleguide-markdown">');
        }

        echo $content;

        if ( ! $styleguide_section ) {
            echo ('</div>');
        }
    }

    styleguideHTML();
?>
