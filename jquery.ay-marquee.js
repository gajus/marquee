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
	
	var nativeTransition;
	
	$.ay = $.ay || {};
	
	$.ay.marquee = function (options) {
		var settings;
	
		if (!options.target || !options.target instanceof $) {
			throw 'Target is not defined or it is not instance of jQuery.';
		}
	
		settings = $.extend({
			direction: 'left',
			speed: 800
		}, options);
		
		if (nativeTransition === undefined) {
			nativeTransition =
				'WebkitTransition' in document.body.style ? '-webkit-transition' : false ||
		        'MozTransition' in document.body.style ? '-moz-transition' : false ||
		        'msTransition' in document.body.style ? '-ms-transition' : false ||
		        'OTransition' in document.body.style ? '-o-transition' : false ||
		        'Transition' in document.body.style ? 'transition' : false ;
		}
		
		settings.direction	= settings.direction === 'left' ? 'left' : 'right';
        
        /*var uniqueStyle = (function () {
			var unique = {}; // @todo
			
			return function (childWidth) {
				var className = 'ay-transition-' + Math.random().toString(36).substr(2, 5);
				
				$('<style>.' + className + ' { ' + nativeTransition + ': margin-' + settings.direction + ' ' + settings.speed + 'ms linear; margin-' + settings.direction + ': -' + childWidth + 'px!important; }</style>').appendTo('head');
				
				return className;
			};
		}());*/ 
		
		options.target.each(function () {
			var container = $(this),
				containerWidth = container.width(),
				wrapper = container.children().eq(0),
				children = wrapper.children(),
				// assume that all children have identical width
				calculatedWrapperWidth = 0,
				childNumber = 0;
			
			children.each(function () {
				calculatedWrapperWidth += $(this).outerWidth(true);
			});
			
			wrapper.width(calculatedWrapperWidth);
			
			var uniqueStyle = (function () {
				var assignedClasses = {};
				
				return function (elementWidth) {
					var duration,
						className;
				
					if (elementWidth in assignedClasses) {
						return assignedClasses[elementWidth];
					}
				
					duration = (elementWidth/containerWidth)*settings.speed;
					className = 'ay-transition-' + Math.random().toString(36).substr(2, 5);
					
					$('<style>.' + className + ' { ' + nativeTransition + ': margin-' + settings.direction + ' ' + duration + 'ms linear; margin-' + settings.direction + ': -' + elementWidth + 'px!important; }</style>').appendTo('head');
					
					return assignedClasses[elementWidth] = {name: className, duration: duration};
				}
			}());
			
			if (nativeTransition) {
				var child;
				var lastName;
				
				var animate = function animate() {
					if (child) {
						child.appendTo(wrapper).removeClass(lastName);
					}
					
					child 	= children.eq(childNumber);
					
					var transition = uniqueStyle(child.outerWidth(true));
					
					console.log(transition);
					
					child.addClass( transition.name );
					
					lastName = transition.name;
					
					childNumber = children.length > childNumber+1 ? childNumber+1 : 0;
					
					setTimeout(animate, transition.duration)
				}();
			}
			
			
			/*
			
			 if (nativeTransition) {
				var uniqueTransitionName = uniqueStyle(childWidth);
				
				//uniqueTransitionName
				var child;
				
				var animate = function animate() {
					if (child) {
						child.appendTo(wrapper).removeClass(uniqueTransitionName);
					}
					
					child 	= children.eq(childNumber);
					
					child.addClass(uniqueTransitionName);
					
					childNumber = children.length > childNumber+1 ? childNumber+1 : 0;
					
					setTimeout(animate, settings.speed)
				}();
			}else {
				var margin_rule = function(margin){
					var obj = {};
				
					obj['margin-' + settings.direction] = margin;
				
					return obj;
				};
			
				var animate = function () {
					var child = children.eq(childNumber);
					
					childNumber = children.length > childNumber+1 ? childNumber+1 : 0;
					
					child.animate(margin_rule(-childWidth), {duration: settings.speed, easing: 'linear', complete: function () {
						child.appendTo(wrapper).css(margin_rule(0));
						
						animate();
					}});
				};
				
				animate();
			}*/			
		});
	};
})();