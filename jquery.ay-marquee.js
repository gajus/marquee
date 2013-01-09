/**
 * jQuery circus v0.0.3 (2013 JAN 09)
 * https://github.com/gajus/marquee
 *
 * Licensed under the BSD.
 * https://github.com/gajus/marquee/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 */
(function(){
	'use strict';

	$.fn.ayMarquee = function(options){
		var settings	= $.extend({
			direction: 'left',
			speed: 800
		}, options);
		
		settings.direction	= settings.direction === 'left' ? 'left' : 'right';
		
		var transition_support =
			'WebkitTransition' in document.body.style ||
            'MozTransition' in document.body.style ||
            'msTransition' in document.body.style ||
            'OTransition' in document.body.style ||
            'Transition' in document.body.style;
		
		var prepare_unique_style = function(child_width){
			var unique_transition_name = 'ay-transition-' + Math.random().toString(36).substr(2, 5),
				transition = 'margin-' + settings.direction + ' ' + settings.speed + 'ms linear';
			
			$('<style>.' + unique_transition_name + ' { -webkit-transition: ' + transition + '; -moz-transition: ' + transition + '; -ms-transition: ' + transition + '; -o-transition: ' + transition + '; transition: ' + transition + '; margin-' + settings.direction + ': -' + child_width + 'px!important; }</style>').appendTo('head');
			
			return unique_transition_name;
		};
		
		this.each(function(){
			var container = $(this),
				wrapper = container.children().eq(0),
				children = wrapper.children(),
				// assume that all children have identical width
				child_width = children.eq(0).outerWidth(true),
				calculated_wrapper_width = children.length*child_width;
			
			wrapper.width(calculated_wrapper_width);
			
			var child_number = 0;
			
			if(transition_support)
			{
				var unique_transition_name = prepare_unique_style(child_width);
				
				//unique_transition_name
				var child;
				
				var animate = function animate(){
					if(child)
					{
						child.appendTo(wrapper).removeClass(unique_transition_name);
					}
					
					child 	= children.eq(child_number);
					
					child.addClass(unique_transition_name);
					
					child_number = children.length > child_number+1 ? child_number+1 : 0;
					
					setTimeout(animate, settings.speed)
				}();
			}
			else
			{
				var margin_rule = function(margin){
					var obj = {};
				
					obj['margin-' + settings.direction] = margin;
				
					return obj;
				};
			
				var animate = function(){
					var child = children.eq(child_number);
					
					child_number = children.length > child_number+1 ? child_number+1 : 0;
					
					child.animate(margin_rule(-child_width), {duration: settings.speed, easing: 'linear', complete: function(){
						child.appendTo(wrapper).css(margin_rule(0));
						
						animate();
					}});
				};
				
				animate();
			}			
		});
	};
})();