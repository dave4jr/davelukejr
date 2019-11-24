/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Animate Component
 *========================================*/
import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import ml from './moving-letters.js';


const effects = (effect) => {
	
	switch(effect) {
		case "borderFade":
		case "effect1":
			$('.effect1 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect1"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect1 .letter',
				scale: [0.3, 1],
				opacity: [0, 1],
				translateZ: 0,
				easing: "easeOutExpo",
				duration: 600,
				delay: function(el, i) {
					return 70 * (i + 1)
				}
			}).add({
				targets: '.effect1 .line',
				scaleX: [0, 1],
				opacity: [0.5, 1],
				easing: "easeOutExpo",
				duration: 700,
				offset: '-=875',
				delay: function(el, i, l) {
					return 80 * (l - i);
				}
			}).add({
				targets: '.effect1',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
		
		case "zoomLTR":
		case "effect2":
			$('.effect2').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});

			ml.timelines["effect2"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect2 .letter',
				scale: [4, 1],
				opacity: [0, 1],
				translateZ: 0,
				easing: "easeOutExpo",
				duration: 950,
				delay: function(el, i) {
					return 70 * i;
				}
			}).add({
				targets: '.effect2',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		case "fadeLTR":
		case "effect3":
			$('.effect3').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect3"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect3 .letter',
				opacity: [0, 1],
				easing: "easeInOutQuad",
				duration: 2250,
				delay: function(el, i) {
					return 150 * (i + 1)
				}
			}).add({
				targets: '.effect3',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
		
		case "singleWordZoom":
		case "effect4":	
			const ml4 = {};
			ml4.opacityIn = [0, 1];
			ml4.scaleIn = [0.2, 1];
			ml4.scaleOut = 3;
			ml4.durationIn = 800;
			ml4.durationOut = 600;
			ml4.delay = 500;
			ml.timelines["effect4"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect4 .letters-1',
				opacity: ml4.opacityIn,
				scale: ml4.scaleIn,
				duration: ml4.durationIn
			}).add({
				targets: '.effect4 .letters-1',
				opacity: 0,
				scale: ml4.scaleOut,
				duration: ml4.durationOut,
				easing: "easeInExpo",
				delay: ml4.delay
			}).add({
				targets: '.effect4 .letters-2',
				opacity: ml4.opacityIn,
				scale: ml4.scaleIn,
				duration: ml4.durationIn
			}).add({
				targets: '.effect4 .letters-2',
				opacity: 0,
				scale: ml4.scaleOut,
				duration: ml4.durationOut,
				easing: "easeInExpo",
				delay: ml4.delay
			}).add({
				targets: '.effect4 .letters-3',
				opacity: ml4.opacityIn,
				scale: ml4.scaleIn,
				duration: ml4.durationIn
			}).add({
				targets: '.effect4 .letters-3',
				opacity: 0,
				scale: ml4.scaleOut,
				duration: ml4.durationOut,
				easing: "easeInExpo",
				delay: ml4.delay
			}).add({
				targets: '.effect4',
				opacity: 0,
				duration: 500,
				delay: 500
			});
			break;
			
		case "borderSplit":
		case "effect5":
			ml.timelines["effect5"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect5 .line',
				opacity: [0.5, 1],
				scaleX: [0, 1],
				easing: "easeInOutExpo",
				duration: 700
			}).add({
				targets: '.effect5 .line',
				duration: 600,
				easing: "easeOutExpo",
				translateY: function(e, i, l) {
					var offset = -0.625 + 0.625 * 2 * i;
					return offset + "em";
				}
			}).add({
				targets: '.effect5 .ampersand',
				opacity: [0, 1],
				scaleY: [0.5, 1],
				easing: "easeOutExpo",
				duration: 600,
				offset: '-=600'
			}).add({
				targets: '.effect5 .letters-left',
				opacity: [0, 1],
				translateX: ["0.5em", 0],
				easing: "easeOutExpo",
				duration: 600,
				offset: '-=300'
			}).add({
				targets: '.effect5 .letters-right',
				opacity: [0, 1],
				translateX: ["-0.5em", 0],
				easing: "easeOutExpo",
				duration: 600,
				offset: '-=600'
			}).add({
				targets: '.effect5',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
			
		case "letterBounceUp":
		case "effect6":
			$('.effect6 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect6"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect6 .letter',
				translateY: ["1.1em", 0],
				translateZ: 0,
				duration: 750,
				delay: function(el, i) {
					return 50 * i;
				}
			}).add({
				targets: '.effect6',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		
		case "letterFlipUp":
		case "effect7":
			$('.effect7 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect7"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect7 .letter',
				translateY: ["1.1em", 0],
				translateX: ["0.55em", 0],
				translateZ: 0,
				rotateZ: [180, 0],
				duration: 750,
				easing: "easeOutExpo",
				delay: function(el, i) {
					return 50 * i;
				}
			}).add({
				targets: '.effect7',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		
		case "circleRotate":
		case "effect8":
			ml.timelines["effect8"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect8 .circle-white',
				scale: [0, 3],
				opacity: [1, 0],
				easing: "easeInOutExpo",
				rotateZ: 360,
				duration: 1100
			}).add({
				targets: '.effect8 .circle-container',
				scale: [0, 1],
				duration: 1100,
				easing: "easeInOutExpo",
				offset: '-=1000'
			}).add({
				targets: '.effect8 .circle-dark',
				scale: [0, 1],
				duration: 1100,
				easing: "easeOutExpo",
				offset: '-=600'
			}).add({
				targets: '.effect8 .letters-left',
				scale: [0, 1],
				duration: 1200,
				offset: '-=550'
			}).add({
				targets: '.effect8 .bang',
				scale: [0, 1],
				rotateZ: [45, 15],
				duration: 1200,
				offset: '-=1000'
			}).add({
				targets: '.effect8',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1400
			});
			anime({
				targets: '.effect8 .circle-dark-dashed',
				rotateZ: 360,
				duration: 8000,
				easing: "linear",
				loop: true
			});
			break;
			
		
		case "letterMorphUp":
		case "effect9":
			$('.effect9 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect9"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect9 .letter',
				scale: [0, 1],
				duration: 1500,
				elasticity: 600,
				delay: function(el, i) {
					return 45 * (i + 1)
				}
			}).add({
				targets: '.effect9',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
			
		case "letterFlipX":
		case "effect10":
			$('.effect10 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect10"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect10 .letter',
				rotateY: [-90, 0],
				duration: 1300,
				delay: function(el, i) {
					return 45 * i;
				}
			}).add({
				targets: '.effect10',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
			
		case "typed":
		case "effect11":
			$('.effect11 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect11"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect11 .line',
				scaleY: [0, 1],
				opacity: [0.5, 1],
				easing: "easeOutExpo",
				duration: 700
			})
			.add({
				targets: '.effect11 .line',
				translateX: [0, $(".effect11 .letters").width()],
				easing: "easeOutExpo",
				duration: 700,
				delay: 100
			}).add({
				targets: '.effect11 .letter',
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 600,
				offset: '-=775',
				delay: function(el, i) {
					return 34 * (i + 1)
				}
			}).add({
				targets: '.effect11',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
			
		case "letterSpaced":
		case "effect12":
			$('.effect12').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect12"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect12 .letter',
				translateX: [40, 0],
				translateZ: 0,
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 1200,
				delay: function(el, i) {
					return 500 + 30 * i;
				}
			}).add({
				targets: '.effect12 .letter',
				translateX: [0, -30],
				opacity: [1, 0],
				easing: "easeInExpo",
				duration: 1100,
				delay: function(el, i) {
					return 100 + 30 * i;
				}
			});
			break;
			
			
		case "wordSlideUp":
		case "effect13":
			$('.effect13').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect13"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect13 .letter',
				translateY: [100, 0],
				translateZ: 0,
				opacity: [0, 1],
				easing: "easeOutExpo",
				duration: 1400,
				delay: function(el, i) {
					return 300 + 30 * i;
				}
			}).add({
				targets: '.effect13 .letter',
				translateY: [0, -100],
				opacity: [1, 0],
				easing: "easeInExpo",
				duration: 1200,
				delay: function(el, i) {
					return 100 + 30 * i;
				}
			});
			break;
			
			
		case "borderBottom":
		case "effect14":
			$('.effect14 .letters').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect14"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect14 .line',
				scaleX: [0, 1],
				opacity: [0.5, 1],
				easing: "easeInOutExpo",
				duration: 900
			}).add({
				targets: '.effect14 .letter',
				opacity: [0, 1],
				translateX: [40, 0],
				translateZ: 0,
				scaleX: [0.3, 1],
				easing: "easeOutExpo",
				duration: 800,
				offset: '-=600',
				delay: function(el, i) {
					return 150 + 25 * i;
				}
			}).add({
				targets: '.effect14',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		
		case "zoomOutWord":
		case "effect15":
			ml.timelines["effect15"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect15 .word',
				scale: [14, 1],
				opacity: [0, 1],
				easing: "easeOutCirc",
				duration: 800,
				delay: function(el, i) {
					return 800 * i;
				}
			}).add({
				targets: '.effect15',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		
		case "fallDown":
		case "effect16":
			$('.effect16').each(function() {
				// eslint-disable-next-line
				$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
			});
			ml.timelines["effect16"] = anime.timeline({
				loop: true
			}).add({
				targets: '.effect16 .letter',
				translateY: [-100, 0],
				easing: "easeOutExpo",
				duration: 1400,
				delay: function(el, i) {
					return 30 * i;
				}
			}).add({
				targets: '.effect16',
				opacity: 0,
				duration: 1000,
				easing: "easeOutExpo",
				delay: 1000
			});
			break;
			
		default:
			console.log("RunAnimation | The effect " + effect + " does not match any of the animation names");
			break;
	}
	
}
export default effects;