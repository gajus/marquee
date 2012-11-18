/**
 * jQuery circus v0.0.1 (2012 NOV 18)
 * https://github.com/gajus/ay-circus
 *
 * Licensed under the BSD.
 * https://github.com/gajus/ay-circus/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 */
(function(){
	$.fn.ayCircus = function(options){
		var settings	= $.extend({
			direction: 'left',
			speed: 800
		}, options);
		
		settings.direction	= settings.direction === 'left' ? 'left' : 'right';
		
		this.each(function(){
			var container		= $(this),
				children		= container.children(),
				wrapper_width	= 0;
			
			
			for(var l = 0, k = children.length; l < k; l++)
			{
				wrapper_width	+= children.outerWidth(true);
			}
			
			container.wrapInner('<div class="wrapper"></div>');
			
			var wrapper	= container.find('> .wrapper');
			
			wrapper.css({overflow: 'hidden', position: 'absolute', height: container.outerHeight(), width: wrapper_width}).css(settings.direction, 0);
			
			var move_element	= function(){
			
				var element = wrapper.children().eq(settings.direction === 'left' ? 0 : -1);
				
				var animation	= {};
				
				animation[settings.direction] = -element.width();
				
				wrapper.animate(animation, {duration: settings.speed, easing: 'linear', complete: function(){
					wrapper.css(settings.direction, 0)[settings.direction === 'left' ? 'append' : 'prepend'](element);
					
					move_element();
				}});
				
			};
			
			move_element();
		});
	};
})();