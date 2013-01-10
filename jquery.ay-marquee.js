/**
 * jQuery circus v0.0.3 (2013 JAN 09)
 * https://github.com/gajus/marquee
 *
 * Licensed under the BSD.
 * https://github.com/gajus/marquee/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 */
$(function(){ // This plugin relies on DOM ready state. Do not move it to IIFE.
	'use strict';
	
	var nativeTransition,
		marqueeImplementation,
		css3Implementation,
		cssImplementation;
	
	nativeTransition =
		'WebkitTransition' in document.body.style && '-webkit-transition' ||
		'MozTransition' in document.body.style && '-moz-transition' ||
		'msTransition' in document.body.style && '-ms-transition' ||
		'OTransition' in document.body.style && '-o-transition' ||
		'Transition' in document.body.style && 'transition';
    
    marqueeImplementation = function (settings) {
    	var container = $(this),
			containerWidth = container.width(),
			wrapper = container.children().eq(0),
			wrapperContentWidth = 0,
			children = wrapper.children(),
			childrenTransitions = [],
			childNumber = 0,
			assignTransition;
		
		assignTransition = (function () {
			var assigned = {};
			
			return function (elementWidth) {
				var duration,
					className;
					
				if (elementWidth in assigned) {
					return assigned[elementWidth];
				}
				
				duration = (elementWidth/containerWidth)*settings.speed;
				
				if (nativeTransition) {
					className = 'ay-transition-' + Math.random().toString(36).substr(2, 10);
						
					$('<style>.' + className + ' { ' + nativeTransition + ': margin-' + settings.direction + ' ' + duration + 'ms linear; margin-' + settings.direction + ': -' + elementWidth + 'px!important; }</style>').appendTo('head');
				}
				
				return assigned[elementWidth] = {name: className, elementWidth: elementWidth, duration: duration};
			}
		}());
		
		children.each(function () {
			var width = $(this).outerWidth(true);
			
			childrenTransitions.push( assignTransition(width) );
		
			wrapperContentWidth += width;
		});
		
		wrapper.width(wrapperContentWidth);
		
		if (settings.implementation === 'css3' && nativeTransition) {
			container.addClass('ay-css3');
		
			(function animate(child, lastName) {
				var transition;
			
				if (child) {
					child.appendTo(wrapper).removeClass(lastName);
				}
				
				child 	= children.eq(childNumber);
				
				transition = childrenTransitions[childNumber];
				
				child.addClass( transition.name );
				
				lastName = transition.name;
				
				childNumber = children.length > childNumber + 1 ? childNumber + 1 : 0;
				
				
				
				setTimeout(function () {
					animate(child, lastName);
				}, transition.duration)
			}());
		} else {
			container.addClass('ay-css2');
		
			(function () {
				// @todo merge the left/right implementations
				if (settings.direction === 'left') {
					(function animateLeft() {
						var child = children.eq(childNumber),
							transition = childrenTransitions[childNumber];
						
						childNumber = children.length > childNumber + 1 ? childNumber + 1 : 0;
						
						container.animate({scrollLeft: transition.elementWidth}, {duration: transition.duration, easing: 'linear', complete: function () {
							child.appendTo(wrapper);
							container[0].scrollLeft = 0;
							
							animateLeft();
						}});
					}());
				} else {
					(function animateRight() {
						var child = children.eq(children.length-1-childNumber),
							transition = childrenTransitions[children.length-1-childNumber];
						
						childNumber = children.length > childNumber + 1 ? childNumber + 1 : 0;
						
						container.scrollLeft(wrapperContentWidth-containerWidth);
						
						container.animate({scrollLeft: wrapperContentWidth-containerWidth-transition.elementWidth}, {duration: transition.duration, easing: 'linear', complete: function () {
							child.prependTo(wrapper);
							container.scrollLeft(wrapperContentWidth-containerWidth);
							
							animateRight();
						}});
					}());
				}
			}());
		}
	};
    	
	$.ay = $.ay || {};
	
	$.ay.marquee = function (options) {
		var settings;
	
		if (!options.target || !options.target instanceof $) {
			throw 'Target is not defined or it is not instance of jQuery.';
		}
	
		settings = $.extend({
			direction: 'left',
			speed: 800,
			implementation: 'css3'
		}, options);
		
		settings.direction	= settings.direction === 'left' ? 'left' : 'right';
		
		options.target.each(function () {
			marqueeImplementation.call(this, settings);
		});
	};
});