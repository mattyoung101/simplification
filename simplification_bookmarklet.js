/**
 * Simplification Bookmarklet. Add this little bookmarklet to your browser and be amazed!
 * Simplification - Distraction Free Browsing.
 * Simplification removes footers, sidebars, comments, navbars, author details and more at the click of a button.
 *
 * COMPATIBILITY: The bookmarklet itself should work in all browsers (mabye not Netscape, but...)
 *
 * A project by Fridgefish.
 * Simplification is licenced under the Apache Licence 2.0. See LICENCE.
 */

javascript:
 
script     = document.createElement('script');
// Not really required in modern browsers
script.type = 'text/javascript';

script.src = 'http://fridgefish.github.io/simplification/simplification.min.js';

// Add the script to the head tag
document.getElementsByTagName('head')[0].appendChild(script);
