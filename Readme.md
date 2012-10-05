Introduction
============

A JQuery plugin for creating an image gallery with popup information on hover (similar to ted.com)


Sample use:
```
$('#js-container-1').jsquares2({});
```

The following are the options that can be passed to the jsquares2 function:

```
smallImg				: '.js-small-image', 	// target link
image					: '.js-image', 			// target (div) holding info
caption_width			: 668, 					// caption overlay width
caption_delay			: 20, 					// milliseconds to wait before showing the caption
fade_to					: .5, 					// fade image/caption to what..
fade_start				: 1, 					// send image back to...
fade_on_hover			: true, 				// do we want the images to fade on hover or just change opacity?
caption_animate			: true, 				// animate the caption overlay
caption_animate_time	: 300, 					// animation time
caption_animate_easing  : 'easeOutBack',        // animation easing
```

Note: Keep your images small to avoid flickering in the animations.


See examples/jsquares2.html for more details.

![](https://raw.github.com/rmeschian/jsquares2/master/examples/screenshot.jpg) 




Sites Using JSquares2
=====================

![http://www.sistemaarmenia.com/values](https://raw.github.com/rmeschian/jsquares2/master/examples/screenshot2.jpg) 

http://www.sistemaarmenia.com/values

Credits
=======

This is a fork of JSquares by Jordan Boesch - http://boedesign.com/blog/2009/10/22/jsquares-for-jquery/

Contributors
============

Rouben Meschian (JSquares2) and Jordan Boesch (JSquares)

License
=======

Dual licensed under the MIT and GPL licenses.