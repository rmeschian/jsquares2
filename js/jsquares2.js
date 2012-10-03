/*
 * JSquares2 for jQuery
 * 
 * http://roubenmeschian.com
 * 
 * Dual licensed under the MIT and GPL licenses.
 *
 * Version: 1.0
 * 
 * Fork of jSquares - http://boedesign.com/blog/2009/10/22/jsquares-for-jquery/
 *
 */
(function($) {
	
	$.fn.jsquares2 = $.fn.jSquares2 = function(options){
		
		var defaults = {
			smallImg				: '.js-small-image', 	// target link
			image					: '.js-image', 			// target (div) holding info
			caption_width			: 600, 					// caption overlay width
			caption_delay			: 20, 					// milliseconds to wait before showing the caption
			fade_to					: .3, 					// fade image/caption to what..
			fade_start				: 1, 					// send image back to...
			fade_on_hover			: true, 				// do we want the images to fade on hover or just change opacity?
			caption_animate			: true, 				// animate the caption overlay
			caption_animate_time	: 300, 					// animation time
			
			_overlay_selector_class	: 'js-caption-overlay'	// private selector
		};
		
		options = $.extend(defaults, options);
		
		// --------------------------------------------------
		
		var  curCaptionOverlay, 
		     gridContainer = this, 
		     requests = [], 
		     prevTimer;
		
		var runWithDelay = function(func, delay) {
			if (delay === undefined)
				delay = 130;
			requests.push(func);
			if (prevTimer)
				window.clearTimeout(prevTimer);
			prevTimer = window.setTimeout(function() {
				var f = requests.pop();
				requests = new Array();
				f();
			}, delay);
		}
		
		var hide = function(localCN, cellNode) {
			var c = localCN || curCaptionOverlay;
			runWithDelay(function() {
				if(!c)
					return;
				c.remove();
				if (curCaptionOverlay && curCaptionOverlay[0] === c[0])
					curCaptionOverlay = null;
				runWithDelay(function() {
					if(options.fade_on_hover)
						gridContainer.find(options.smallImg).css('opacity', options.fade_start);
				}, 0);
			});
		}

		gridContainer.mousemove(function() { hide(); });
		gridContainer.find(options.image).mousemove(function() { return false; });
		gridContainer.find(options.image).mouseenter(function() {
			var that = this;
			var girdCell = $(that);
			runWithDelay(function() {
				if (curCaptionOverlay) {
					if (curCaptionOverlay.js2T === that)
						return;
					curCaptionOverlay.remove();
				}
				var cellPos	= girdCell.offset();
				var cellH 	= girdCell.height();
				var cellW 	= girdCell.width();
				var halfWay = gridContainer.offset().left + gridContainer.width() / 2;
				var isLeft  = cellPos.left < halfWay;
				
				var node = document.createElement('div');
				node.innerHTML = isLeft ? "<table><tr><td style='line-height: 0'><img class='js-caption-img' src='" + girdCell.find('.js-small-image').attr('src') + "'/></td><td style='padding-left: 10px'><div class='jsquares2CaptionTxt' style='display: none'>" + girdCell.find('.js-overlay-caption-content').html() + "</div></td></tr></table>" : "<table><tr><td style='padding-right: 10px; width: 100%'><div class='jsquares2CaptionTxt' style='display: none'>" + girdCell.find('.js-overlay-caption-content').html() + "</div></td><td style='line-height: 0'><img class='js-caption-img' src='" + girdCell.find('.js-small-image').attr('src') + "'/></td></tr></table>";
				
				curCaptionOverlay = $(node);
				if(options.caption_img_height)
					curCaptionOverlay.find('.js-caption-img').css('height', options.caption_img_height);
				
				curCaptionOverlay.js2T 	= that;
				var totalWidth   		= options.caption_width;
				var initialWidth 		= options.caption_animate ? (options.caption_width * 2/3) : totalWidth;
				var top          		= cellPos.top;
				var left         		= cellPos.left;
				
				if (!isLeft)
					left = (left + cellW) - (initialWidth + 23);
				
				curCaptionOverlay.mouseleave(function() { hide(curCaptionOverlay, that); });
				curCaptionOverlay.mouseenter(function() { runWithDelay(function() { }); });
				curCaptionOverlay.css('top', top).css('left', left).css('width', initialWidth).css('min-height', cellH - 22).addClass(options._overlay_selector_class);
				$("body").append(node);
				
				var doneAnim = function() { curCaptionOverlay.find('.jsquares2CaptionTxt').css('display', 'inherit'); }
				
				if(options.caption_animate) {
					if (isLeft) {
						curCaptionOverlay.animate({ width : totalWidth }, options.caption_animate_time, null, doneAnim);
					} else {
						left -= (totalWidth - initialWidth);
						curCaptionOverlay.animate({ 
							left  : left,
							width : totalWidth
						}, options.caption_animate_time, null, doneAnim);
					}
				} else {
					doneAnim();
				}
				
				if(options.fade_on_hover)
					gridContainer.find(options.smallImg).css('opacity', options.fade_to);
				
			}, options.caption_delay);
		});
		return this;
	};
	
})(jQuery);                                                  
