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
	
	$.extend( $.easing, {
    	easeOutBack: function (x, t, b, c, d, s) {
    		if (s == undefined) s = 1.70158;
    		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    	}
    });

	$.fn.jsquares2 = $.fn.jSquares2 = function(options){
		var defaults = {
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
						gridContainer.find(options.smallImg).fadeTo(10, options.fade_start);
				}, 0);
			});
		}

		gridContainer.mousemove(function() { hide(); });
		gridContainer.find(options.image).mousemove(function() { return false; });
		gridContainer.find(options.image).mouseenter(function() {
			var that = this;
			var girdCell = $(that);
			runWithDelay(function() {
				if (curCaptionOverlay && curCaptionOverlay !== undefined) {
					if (curCaptionOverlay.js2T === that)
						return;
					curCaptionOverlay.remove();
				}
				
				var capTxt = girdCell.find('.js-overlay-caption-content').html();
				var capImg = girdCell.find('.js-small-image').attr('src');
				
				// 1. load image and compute size
                var img = new Image();
                img.onload = function() {
                    
                    var cellPos	            = girdCell.offset();
    				var cellH 	            = girdCell.height();
    				var cellW 	            = girdCell.width();
    				var halfWay             = gridContainer.offset().left + gridContainer.width() / 2;
    				var isLeft              = cellPos.left < halfWay;
    				
    				var caption_border_size = 14;
    				var totalWidth   		= options.caption_width;
    				var initialWidth 		= options.caption_animate ? (options.caption_width * 2/3) : totalWidth;
    				
                    var imgH                = this.height;
                    var imgW                = this.width;
                    var newImgWidth         = totalWidth/2;
                    var newImgHeight        = Math.ceil(imgH * (newImgWidth/imgW));
                    
                    var top          		= cellPos.top - caption_border_size;
    				
    				curCaptionOverlay = isLeft ?
    				    $("<div style='height: "+newImgHeight+"px'><div style='position: relative'>            <div style='position: absolute; top: 0; left: 0; line-height: 0'><img src='" + capImg + "' style='width: "+newImgWidth+"px' /></div>                   <div class='jsquares2CaptionTxt' style='display: none; position: absolute; top: 0; right: 0; left: "+(newImgWidth+10)+"px'>"+capTxt+"</div>                   </div></div>")
    				    :
    				    $("<div style='height: "+newImgHeight+"px'><div style='position: relative'>  <div class='jsquares2CaptionTxt' style='display: none; position: absolute; top: 0; left: 0; right: "+(newImgWidth+4)+"px'>"+capTxt+"</div> <div style='position: absolute; top: 0; right: 0; line-height: 0'><img src='" + capImg + "' style='width: "+newImgWidth+"px' /></div>       </div></div>");
    				
    				curCaptionOverlay.js2T 	= that;
    				
    				curCaptionOverlay.mouseleave(function() { hide(curCaptionOverlay, that); });
    				curCaptionOverlay.mouseenter(function() { runWithDelay(function() { }); });
    				
    				curCaptionOverlay.css('top', top).css('width', initialWidth).addClass(options._overlay_selector_class); // css('min-height', cellH - 22)
    				
    				if(isLeft) {
    				    curCaptionOverlay.css('left', cellPos.left-caption_border_size);
    				} else {
    				    curCaptionOverlay.css('right', ($(document).width()-(cellPos.left + cellW + caption_border_size)));
    				}
    				    
    				$("body").append(curCaptionOverlay);
    				
    				var doneAnim = function() { curCaptionOverlay.find('.jsquares2CaptionTxt').fadeIn(60); }
    				
    				if(options.caption_animate) {
                        curCaptionOverlay.animate({ width : totalWidth }, options.caption_animate_time, options.caption_animate_easing, doneAnim);
    				} else {
    					doneAnim();
    				}
    				
    				if(options.fade_on_hover)
    					gridContainer.find(options.smallImg).css('opacity', options.fade_to);
    				
                };
                img.src = capImg;

			}, options.caption_delay);
		});
		
		return this;
	};
	
})(jQuery);                                                  
