/**
 * Simplification Filterer - This is what is run by the bookmarklet.
 * Simplification - Distraction Free Browsing.
 * Simplification removes headers, navbars, widgets, sidebars, forms, breadcrumbs and more at the click of a button.
 *
 * COMPATIBILITY: Chrome >1, Firefox >3.5, IE >9, Opera >10, Safari >3.2
 *
 * A project by Fridgefish.
 * Simplification is licenced under the Apache Licence 2.0. See LICENCE.
 */

// KNOWN ISSUES:
// Doesn't seem to work on HTTPS sites
// Doesn't work on all sites (see below)
// Doesn't work with the Chrome extension PrivacyBadger
// Copyright is not removed on some websites
// Blocking iframes doesn't work!

// FIXES
// HTTPS Issue: In Chrome, click the Shield icon in the far right in the URL bar and click "Load unsafe script" (Simplification is completely safe: Chrome only says this because the script is not stored on an HTTPS sever)
// Not working on all sites issue: Head over to fridgefish.com/bugfish/report and create a new issue on the project 'Simplification'. Alternatively, report an issue on the GitHub page.
// To fix, drag the 'fridgefish.com' or 'githubusercontent.com' or 'github.com' slider to allow all. (drag it to the green).
// Copyright is not removed for legal reasons (so that a website still has it's copyright)
// Call me dumb, but I've got no bloody idea!

// TODO
// The Grand TODO List
// 
// 1) Use a RegExp to pick out the names. Some websites have, for example, 'global__navbar' but we are only
// looking for 'nav', so it doesn't work.

// The filter list of things to block.
var distractions = [
	// Headers
	'header',
	'#header', '#main-header', '#header-menu-content', '#header-wrap', '#top-bar',
	'.header', '.main-header', '.header-menu-content', '.header-wrap', '.top-bar',

	// Categories
	'#cat', '#categories',
	'.cat', '.categories',

	// Long art. Art that is stretched across the page to form a border
	'#long-art', '#longArt',
	'.long-art', '.longArt',

	// Top post images (images up the top of a post)
	'#top-post-image',
	'.top-post-image',

	// Notices
	'#notice', '#global-notice',
	'.notice', '.global-notice',

	// Comments
	'.comments', '.replies', '.disqus', '.disqus-thread', '.disqus_thread',
	'#comments', '#replies', '#disqus', '#disqus-thread', '#disqus_thread',

	// Section. MAY BREAK SOME WEBSTIES IF THE CONTENT IS A SECTION IF THIS DOES NOT WORK COMMENT IT OUT SORRY FOR CAPS.
	'section',

	// Breadcrumbs
	'.breadcrumb', '.breadcrumbs', '.crumb', '.crumbs', '.breadCrumb', '.breadCrumbs',
	'#breadcrumb', '#breadcrumbs', '#crumb', '#crumbs', '#breadCrumb', '#breadCrumbs',

	// Navbars
	'nav',
	'#nav', '#navbar', '#navigation', '#menu', '#mainMenu', '#mainmenu', '#mainNav', '#mainnav', '#subav',
	'.nav', '.navbar', '.navigation', '.menu', '.mainMenu', '.mainmenu', '.mainNav', '.mainnav', '.subnav',

	// Meta
	'#author', '#author__box', '#meta', '#authorinfo', '#authorInfo', '#author-info', '#aboutbox', '#infobox', '#about_the_author',
	'#authorBox', '#authorbox', '#author-box', '#entry-meta', '#after-entry-wrap', '#after-entry', '.about_the_author',

	'.author', '.author__box', '.meta', '.authorinfo', '.authorInfo', '.author-info', '.aboutbox',
	'.infobox', '.authorBox', '.authorbox', '.author-box', '.entry-meta', '.after-entry-wrap', '.after-entry',

	// Related posts
	'#relatedPosts', '#related', '#related-posts', '#related-post',
	'.relatedPosts', '.related', '.related-posts', '.related-post',

	// Feedback
	'#feedback', '#feedback-tab', '#feedbacktab', '#feedbackTab',
	'.feedback', '.feedback-tab', '.feedbacktab', '.feedbackTab',

	// Forms
	'form',
	'#form', '#input', '#searchForm', '#search', '#searchbar', '#searchbox', '#sitesearch', '#siteSearch',
	'.form', '.input', '.searchForm', '.search', '.searchbar', '.searchbox', '.sitesearch', '.siteSearch',

	// Login boxes
	'#login', '#loginbox', '#login-box', '#loginBox', '#loginwidget', '#login-widget',
	'.login', '.loginbox', '.login-box', '.loginBox', '.loginwidget', '.login-widget',

	// Widget. THIS BLOCKS DIVS WITH THE ID AND CLASS 'plugin' SO IT MAY BREAK SOME OTHER PLUGINS (eg flash, QuickTime etc)
	'iframe',
	'#widget', '#widgetbox', '#widgetBox', '#widget-box', '#ytWidget', '#footer-widgets', '#header-widgets', '#searchbox', '#searchbar', '#plugin',
	'.widget', '.widgetbox', '.widgetBox', '.widget-box', '.ytWidget', '.footer-widgets', '.header-widgets', '.searchbox', '.searchbar', '.plugin',

	// Carousel
	'#carousel', '#slider', '#slideshow',
	'.carousel', '.slider', '.slideshow',

	// Sidebars
	'aside',
	'#sidebar', '#sidebarbox', '#sidebarBox', '#sidebar-list', '#sidebarlist',
	'.sidebar', '.sidebarbox', '.sidebarBox', '.sidebar-list', '.sidebarlist',

	// Social
	'#social', '#socialButtons', '#social-buttons', '#social_buttons', '#social-widget', '#twitter', '#socials', '#sharedaddy', '#buddypress',
	'.social', '.socialButtons', '.social-buttons', '.social_buttons', '.social-widget', '.twitter', '.socials', '.sharedaddy', '.buddypress',

	// Footers
	'footer',
	'#mainFooter', '#sticky-footer', '#footer-bottom', '#bottomFooter', '#main-footer', '#footer-nav-wrap',
	'#footer-nav', '#extra',

	'#footer', '.footer', '.mainFooter', '.sticky-footer', '.footer-bottom', '.bottomFooter',
	'.main-footer', '.footer-nav-wrap', '.footer-nav', '#extra',
];

// BEGIN SIMPLIFICATION
console.log('Simplification is working it\'s magic... this shouldn\'t take long...');
console.log(' ');
console.log('Spot anything that should be blocked? Head over to fridgefish.com/bugfish/report and create a new issue on the project \'Simplification\'');
console.log('Or, head over to the GitHub repository: github.com/fridgefish/simplification and report an issue.');
console.log('Thanks, and enjoy your Simplified web!');

// Grab our font
var font  = document.createElement('link');
font.href = 'http://fonts.googleapis.com/css?family=Droid+Serif';
font.rel  = 'stylesheet';
font.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(font);

// Page adjustments
document.getElementsByTagName('body')[0].style.padding = '50px 0px 0px 0px';
document.getElementsByTagName('body')[0].style.font    = "1.2em 'Droid Serif', serif";

// Loop through our array and block every element
for (i = 0; i < distractions.length; i++) {

	// Does the element exist?
	if (document.querySelector(distractions[i]) != null) {
		// The element exists, so block it.
		document.querySelector(distractions[i]).style.display = 'none';

		// Just in case it doesn't work
		document.querySelector(distractions[i]).style.width = '0px';
		document.querySelector(distractions[i]).style.height = '0px';
		document.querySelector(distractions[i]).style.visibility = 'invisible';
	}
}
// END SIMPLIFICATION