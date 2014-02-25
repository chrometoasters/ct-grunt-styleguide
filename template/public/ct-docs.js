/**
  KSS Styleguide
	Extra functions
	DTRT
*/

/*jshint browser:true, jquery:true, strict:true, devel:true, smarttabs:true */
/*global prettyPrint, designs_path*/

 var styleguide = {

		tests: {
			is_hifi: function() {

				"use strict";

				if ( ( $.browser.msie ) && ( $.browser.version < 8 ) ) {
					return false;
				}
				else {
					return true;
				}
			}
		},

		resize_page_load: true,

		html: {},
		selectors: {},

		cache_selectors: function() {

			"use strict";

			return {
				kss_nav_form: $('#kss-nav-form'),
				kss_jump_nav_hx: $('.ct-docs-heading-2[id], .kss-title-level-2[id], .kss-title-level-3[id]'),
				kss_overview: $('#kss-overview'),
				kss_title: $('h2.kss-title'),
				h1: $('.ct-docs-heading-2'),
				breadcrumbs: $('.breadcrumb')
			};

		},

		 // http://jquerybyexample.blogspot.com/2012/06/get-url-parameters-using-jquery.html
		 get_url_parameter: function(loc, sParam) {

			"use strict";

			 var sPageURL;

			 if ( loc === window.location ) {
				 sPageURL = loc.search.substring(1);
			 }
			 else {
				 sPageURL = loc.split('?')[1];
			 }

			 if ( !sPageURL ) {
				 return;
			 }

			 var sURLVariables = sPageURL.split('&');
			 for (var i = 0; i < sURLVariables.length; i++) {
				 var sParameterName = sURLVariables[i].split('=');
				 if (sParameterName[0] === sParam) {
					 return sParameterName[1];
				 }
			 }
		 },

		enhance_page_select: function() {

			"use strict";

			// hide fallback submit button
			styleguide.selectors.kss_nav_form.removeClass('kss-nojs');

			// select item in selectmenu
			var page_section = styleguide.get_url_parameter(window.location, 'section');
			styleguide.selectors.kss_nav_form.find('option').each( function() {
				if ( $(this).val() === page_section ) {
					$(this).attr('selected', 'selected');
				}
			});

			// go without clicking Go
			// http://stackoverflow.com/questions/5150363/onchange-open-url-via-select-jquery
			var form_action = styleguide.selectors.kss_nav_form.attr('action');
			styleguide.selectors.kss_nav_form.find('select').change(function() {
				window.location = form_action + '?section=' + $(':selected',this).attr('value');
			});

		},

		generate_jumplinks_select: function() {

			"use strict";

			// add select navigation for page headings

			if ( styleguide.selectors.kss_jump_nav_hx.length && styleguide.selectors.kss_nav_form.length ) {

				styleguide.html.kss_jump_nav_select = '<select name="jumpto" id="kss-jump-nav-select" class="kss-select"></select>';

				//console.log( styleguide.html );

				// insert
				styleguide.selectors.kss_nav_form.append( styleguide.html.kss_jump_nav_select );

				styleguide.selectors.kss_jump_nav_select = $('#kss-jump-nav-select');

				styleguide.selectors.kss_jump_nav_hx.each( function(i) {
					// replace node-generated reference dots with dashes, else the ids can't be targetted by jquery (TODO: is this redundant since scrollto was removed?)
					var old_id = $(this).attr('id');
					var new_id = old_id.replace('.', '-'); // x1
					new_id = new_id.replace('.', '-'); // x2
					new_id = new_id.replace('.', '-'); // x3
					$(this).attr('id', new_id);

					// update links which point to these anchors
					$('a[href="#' + old_id + '"]').attr('href', '#' + new_id);

					//console.log($(this).text(), i);

					// exclude first item, as this will match the item in the preceding noscript select
					if ( i > 0 ) {
						styleguide.selectors.kss_jump_nav_select.append('<option value="#' + new_id + '">' + $(this).text() + '</option>');
					}

				});

				// Jump on change
				styleguide.selectors.kss_jump_nav_select.change( function() {

					// jump to anchor
					// this updates the URL which is desirable
					window.location.hash = $(':selected', this).attr('value');

				});
			}

		},

		// Ensure code blocks are highlighted properly...
		highlight_code: function() {

			"use strict";

			if ( styleguide.selectors.kss_overview.length ) {
				if ( $('pre').parent().not('div.highlight') ) {
					$('pre').wrap('<div class="kss-markup styleguide-html"><div class="highlight"></div></div>');
				}
			}

			$('pre>code').addClass('prettyprint');
			prettyPrint();

		},

		copyable_classes: function() {

			"use strict";

			$('input.styleguide-modifier-classname').each( function(i, item) {
				var $this = $(item);
				var $parent_div = $this.parents('.styleguide-html-modifier:first');

				$parent_div.data('styleguide_input', $this);

				$parent_div.click( function() {
					$(this).data('styleguide_input').focus();
				});

				$this
				.bind( 'focus', function() {

					var val1 = $this.val();
					var val2 = val1.split('.').join(' ');
					if ( val2.substring(0, 1) === ' ' ) {
						val2 = val2.substring(1); // remove leading space
					}

					$this.val( val2 );
					$this.select();
				})
				.bind( 'blur', function() {
					var val2 = $this.val();
					val2 = ' ' + val2; // add leading space
					var val1 = val2.split(' ').join('.');
					$this.val( val1 );
				});
			});

		},

		collapse_code: function() {

			"use strict";

			if ( typeof $.fn.collapse !== 'undefined' ) {

				$('.kss-markup').each( function(i, item) {
					$(item).collapse({
						query: '.styleguide-modifier-label'
					});
				});
			}

		},

		setup_toolbar: function() {

			"use strict";

			var toolbar = '';
			toolbar += '<ul class="styleguide_toolbar" id="styleguide-toolbar">';
			toolbar += '<li><label class="sg-overlay-toggle">Toggle overlays: <input type="checkbox" /></label></li>';
			toolbar += '<li><label class="sg-overlay-dimensions">Match design dimensions: <input type="checkbox" /></label></li>';
			toolbar += '<li><label class="sg-overlay-opacity">Change overlay opacity: <input type="range" min="0" max="1" step="0.05" value="0.5" /></label></li>';
			toolbar += '<li><label class="sg-overlay-noscript">Simulate noscript: <input type="checkbox" /></label></li>';
			toolbar += '<li><label class="styleguide-livereload">Enable LiveReload (requires Grunt): <input type="checkbox" /></label></li>';
			toolbar += '<li><label class="sg-overlay-grids">Show all grids: <input type="checkbox" /></label></li>';
			toolbar += '<li><a href="#" class="styleguide-backtotop">Back to top</a></li>';
			toolbar += '</ul>';

			$('body').append(toolbar);

			$('.sg-overlay-toggle > input')
			.click( function() {
				var $this = $(this);
				if ( $this.is(':checked') ) {
					// toggle all overlays on:
					$('.sg-overlay').show();
					styleguide.save_setting('overlay');
				}
				else {
					// toggle all overlays off:
					$('.sg-overlay').hide();
					styleguide.delete_setting('overlay', false);
				}
			});

			// store dimensions data with kss demo that has an overlay
			$('.sg-overlay[data-el-w]').each( function(i, item) {

				var $item = $(item);
				var data_el_w = $item.data('el-w');

				if ( data_el_w > 0 ) {
					$item.parent().parent().attr('data-dimension-width', data_el_w);
				}

			});

			// add the global control to toggle dimensions on and off
			$('.sg-overlay-dimensions > input')
			.click( function() {
				var $this = $(this);

				styleguide.save_hash();

				if ( $this.is(':checked') ) {
					// apply dimensions
					$('[data-dimension-width]').each( function(i, item) {
						var $item = $(item);
						$item.css({
							width: $item.data('dimension-width'),
							'margin-left': 'auto',
							'margin-right': 'auto'
						});
					});

					// save setting
					styleguide.save_setting('dimensions');
				}
				else {
					// remove dimensions
					$('[data-dimension-width]').css({
						width: 'auto',
						'margin-left': 0,
						'margin-right': 0
					});

					// remove setting
					styleguide.delete_setting('dimensions', false);
				}

				styleguide.restore_hash();

			});

			$('.sg-overlay-opacity > input')
			.change( function() {
				var $this = $(this);
				var $checkbox = $(this).parent().siblings('.sg-overlay-toggle').find('input');
				if ( ! $checkbox.is(':checked') ) {
					$checkbox.click(); // this will toggle all on
				}
				$('.sg-overlay').css('opacity', $this.val());
			});

			$('.sg-overlay-noscript > input')
			.click( function() {
				var $this = $(this);
				var $target = $('body'); // it's a global setting so this is easier
				if ( $this.is(':checked') ) {
					$target.addClass('no-js');
					$('.sg-overlay-noscript > input').attr('checked', 'checked'); // this is a global change so check all other noscript boxes
					styleguide.save_setting('noscript');
				}
				else {
					$target.removeClass('no-js');
					$('.sg-overlay-noscript > input').removeAttr('checked'); // this is a global change so check all other noscript boxes
					styleguide.delete_setting('noscript', false);
				}
			});

			$('.sg-overlay-grids > input')
			.click( function() {
				var $this = $(this);
				var $target = $('#kss-main'); // this is the first liner within div.styleguide
				if ( $this.is(':checked') ) {
					$target.addClass('debug');
					$('.sg-overlay-grids > input').attr('checked', 'checked'); // this is a global change so check all other noscript boxes
					styleguide.save_setting('grids');
				}
				else {
					$target.removeClass('debug');
					$('.sg-overlay-grids > input').removeAttr('checked'); // this is a global change so check all other noscript boxes
					styleguide.delete_setting('grids', false);
				}
			});

			$('.styleguide-livereload > input')
			.click( function() {
				var $this = $(this);
				var $target = $this.parents('.styleguide-example').eq(0);
				if ( $this.is(':checked') ) { // unchecked by default
					styleguide.save_setting('livereload');
				}
				else {
					styleguide.delete_setting('livereload', true);
				}
			});

			// Settings that can be enabled via page URL

			if ( styleguide.get_url_parameter(window.location.href, 'overlay') === 'true' ) {

				$('.sg-overlay-toggle > input').not(':checked').eq(0).click(); // this will trigger the others
			}

			if ( styleguide.get_url_parameter(window.location.href, 'dimensions') === 'true' ) {

				$('.sg-overlay-dimensions > input').not(':checked').eq(0).click(); // this will trigger the others
			}

			if ( styleguide.get_url_parameter(window.location.href, 'noscript') === 'true' ) {

				$('.sg-overlay-noscript > input').not(':checked').eq(0).click(); // this will trigger the others
			}

			if ( styleguide.get_url_parameter(window.location.href, 'grids') === 'true' ) {

				$('.sg-overlay-grids > input').not(':checked').eq(0).click(); // this will trigger the others
			}

			// LiveReload (global setting, requires Grunt watch)
			// on page load:
			// if the user checked any box to enable livereload (and updated the URL via pushState)
			if ( styleguide.get_url_parameter(window.location.href, 'livereload') === 'true' ) {
				// append the live reload script
				styleguide.add_live_reload();
				// this is a global setting so check all boxes
				$('.styleguide-livereload > input').attr('checked', 'checked');
			}

		},

		add_live_reload: function() {

			"use strict";

			$('body').append('<script id="script-livereload" src="' + window.location.origin + ':35729/livereload.js"></script>'); // origin includes http://
		},

		save_hash: function() {

			"use strict";

			// TODO: it would be nice to add waypoints so that the hash is automatically saved when a heading is scrolled past
			// as currently it is necessary to choose an item from the dropdown or click on the Section name to save the hash

			var current_anchor = window.location.hash;

			if ( current_anchor ) {
				$(document).data('hash', current_anchor);
			}
		},

		restore_hash: function() {

			"use strict";

			var current_anchor = $(document).data('hash');

			if ( current_anchor ) {
				window.location = current_anchor;
			}
		},

		save_setting: function(setting) {

			"use strict";

			// HTML5 pushState:
			// window.history.pushState('object or string', 'Title', url);
			// http://spoiledmilk.com/blog/html5-changing-the-browser-url-without-refreshing-page/
			// https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history
			// demo: http://html5.gingerhost.com/
			// in the styleguide there will always be a section: ?section=N
			if ( window.location.search.indexOf(setting) === -1 ) {

				styleguide.save_hash();

				history.pushState('', 'Enabled ' + setting, window.location.pathname + window.location.search + '&' + setting + '=true');

				styleguide.restore_hash();
			}

			// this throws a synatx error in jshint
			//if ( callback ) {
			//	window[callback];
			//}

			if ( setting === 'livereload' ) {
				styleguide.add_live_reload();
			}
		},

		delete_setting: function(setting, reload) {

			"use strict";

			if ( window.location.search.indexOf(setting) !== -1 ) {

				styleguide.save_hash();

				history.pushState('', 'Disabled ' + setting, window.location.pathname + window.location.search.replace('&' + setting + '=true', '') );
				// and refresh the page to remove the script from the browser memory
				if ( reload ) {
					window.location.reload();
				}
				else {
					styleguide.restore_hash();
				}
			}
		},

		pixel_perfect_overlays: function() {

			"use strict";

			// Markup:
			// <div class="sg-overlay" data-current="true" data-img="01-OUT3571-Home-signed-in-closed.jpg" data-img-w="1400" data-el-w="1170" data-el-h="48" data-el-x="0" data-el-y="0"></div>

			$('.sg-overlay').each( function(i, item) {

				var $item = $(item);
				var $parent = $item.parent();
				var $label = $parent.prev();

				// start user options, specified via HTML5 data attributes

				// NOTE:
				// The jQuery .data() method is smart about recognizing boolean and numeric values and converts them into their native type.
				// If you want to get the raw data (without the automatic data conversion), you can use .attr()
				// src: http://stackoverflow.com/a/9921173/2172532

				// data-current="true"
				// - flag, which can be toggled if the design is updated causing the overlay settings to be incorrect
				// - OPTIONAL (defaults to false)
				var data_current = $item.data('current');

				// data-img="01-OUT3571-Home-signed-in-closed.jpg"
				// - the filename of the design image
				// - REQUIRED
				var data_img = $item.data('img');

				// data-img-w="1400"
				// - the pixel width of the design image
				// - REQUIRED
				var data_img_w = $item.data('img-w') || false;

				// data-el-w="1170"
				// - the pixel width of the design element
				// - OPTIONAL (defaults to the width of the parent container)
				var data_el_w = $item.data('el-w') || $parent.width();

				// data-el-h="533"
				// - the pixel height of the design element
				// - OPTIONAL (defaults to the height of the parent container)
				var data_el_h = $item.data('el-h') || $parent.height();

				// data-el-x="-707"
				// - the pixel distance to move the design image to the left (defaults to half of the design width)
				// - OPTIONAL (defaults to zero)
				// - note: use a negative value for design elements located to left of center (reqd)
				var data_el_x = $item.data('el-x') || 0; // note: falsey check, as a value of 0 is equivalent to false anyway, hence optional
				//console.log(data_el_x);

				// data-el-y="383"
				// - the pixel distance between the top of the design image and the top of the design element
				// - OPTIONAL (defaults to zero)
				var data_el_y = $item.data('el-y') || 0;

				// end user options

				// if REQUIRED user options not present, exit
				if ( !data_img || !data_img_w ) {
					return;
				}

				// check for designs_path, set in index.tpl.php
				if ( !designs_path ) {
					return;
				}

				var design_center = data_img_w / 2;
				var offset_from_design_center = data_el_x;
				var element_center = data_el_w / 2;
				var pull_left = -1 * design_center;
				var sg_overlay_controls = '';

				if ( offset_from_design_center !== 0 ) {
					pull_left = offset_from_design_center; // this value is already positive or negative
				}

				/*
				if ( element_center < design_center/2 ) { // TODO: this isn't very scientific, but appears to work - why? :)

					if ( offset_from_design_center < 0 ) { // pulling to left
						pull_left -= element_center; // so that the pull starts at the LHS of the element
					}
					else if ( offset_from_design_center > 0 ) { // pushing to right (pulling less far to left)
						pull_left += element_center; // so that the pull starts at the LHS of the element
					}

				}
				*/

				$item
				.attr('id', 'sg-overlay-' + i)
				.css({
					left: '50%',
					width: data_img_w,
					height: data_el_h,
					'margin-left': (pull_left + 'px'), // the overlay is centered horizontally, by pulling the overlay to the left
					'background-image': 'url(' + designs_path + data_img + ')',
					'background-position': '50% ' + (-1 * data_el_y) + 'px'
				})
				.hide();

				sg_overlay_controls = '<div class="sg_overlay_controls">';
				sg_overlay_controls += '<p class="sg_overlay_src">Source: <a target="_blank" href="' + designs_path + data_img + '">' + data_img + '</a>';

				if ( !data_current ) {
					sg_overlay_controls += '<strong style="color:red;"> - OUT OF DATE</strong>';
				}

				sg_overlay_controls += '</p>';
				//sg_overlay_controls += '<label class="styleguide-example-pinner">Pin example: <input type="checkbox" /></label>';
				sg_overlay_controls += '<div class="styleguide-clear"></div>';
				sg_overlay_controls += '</div>';

				$label.append(sg_overlay_controls);

				$item.wrap('<div class="sg-overlay-mask"></div>');
			});

			/* I think this is redundant now
			$('.styleguide-example-pinner > input')
			.click( function() {
				var $this = $(this);
				var $target = $this.parents('.styleguide-example').eq(0);
				if ( $this.is(':checked') ) {
					$target.addClass('styleguide-example-pinned');
				}
				else {
					$target.removeClass('styleguide-example-pinned');
				}
			});
			*/

		},


		init: function() {

			"use strict";

			 if ( styleguide.tests.is_hifi ) {

				styleguide.selectors = styleguide.cache_selectors();

				styleguide.enhance_page_select();

				styleguide.generate_jumplinks_select();

				// TODO: add copy to prettyprint somehow so that the HTML can be copied as easily as this
				// styleguide.copyable_classes();

				styleguide.highlight_code();

				styleguide.collapse_code(); // needs more styling to be useful

				styleguide.pixel_perfect_overlays();

				styleguide.setup_toolbar();
			 }
		}

 };

if (typeof jQuery !== 'undefined') {

	jQuery(document).ready( function() {

		"use strict";

		if ( typeof styleguide !== 'undefined' ) {
			styleguide.init();
		}

	});

}