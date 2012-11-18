/**
 * jQuery circus v0.0.1 (2012 NOV 18)
 * https://github.com/gajus/infinite-circus
 *
 * Licensed under the BSD.
 * https://github.com/gajus/infinite-circus/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 */
(function(){
	'use strict';

	$.fn.ayInfiniteCircus = function(options){
		var settings	= $.extend({
			direction: 'left',
			speed: 800
		}, options);
		
		settings.direction	= settings.direction === 'left' ? 'left' : 'right';
		
		this.each(function(){
			var container = $(this),
				wrapper = container.children().eq(0),
				children = wrapper.children(),
				// assume that all children have identical width
				child_width = children.eq(0).outerWidth(true),
				calculated_wrapper_width = children.length*child_width;
			
			wrapper.width(calculated_wrapper_width);
			
			var child_number = 0;
			
			var animate = function(){
				var child = children.eq(child_number);
				
				child_number = children.length > child_number+1 ? child_number+1 : 0;
				
				child.animate({marginLeft: -child_width}, {duration: settings.speed, easing: 'linear', complete: function(){
					child.appendTo(wrapper).css({marginLeft: 0});
					
					animate();
				}});
			};
			
			animate();
		});
	};
})();