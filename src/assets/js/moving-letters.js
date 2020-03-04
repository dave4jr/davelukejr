import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';
import app from './app.js';

var ml = {};
ml.timelines = {};
ml.overlay = {};
ml.isShowingSource = false;

$(function() {
	ml.init();
	ml.onlyPlayVisible();

	// $(".composition-wrapper").click(function(e) {
	// 	ml.showComposition(this, e);
	// });

	// $(".composition-back-button").click(function(e) {
	// 	e.preventDefault();
	// 	ml.hideSource();
	// });

	// $(".header-title").click(ml.animateHeader);

	$(window).on("scroll resize", ml.onlyPlayVisible).on("resize", ml.overlay.resizeCanvas);
	$(document).on("app:menuDidReveal", ml.pauseAllCompositions).on("app:menuWillHide", ml.onlyPlayVisible).on("pressed:ESC", ml.hideSource);

	// Load composition from hash (if defined)
	ml.loadCompositionFromCurrentHash();
});

ml.init = function() {
	// Compositions
	ml.compositions = $(".composition");

	// Overlay
	ml.overlay.c = document.getElementById("color-overlay");
	ml.overlay.ctx = ml.overlay.c.getContext("2d");
	
	ml.overlay.bgColor = "transparent";
	ml.overlay.animations = [];
	ml.overlay.resizeCanvas();

	ml.overlayAnimation = anime({
		duration: Infinity,
		update: function() {
			ml.overlay.ctx.fillStyle = ml.overlay.bgColor;
			ml.overlay.ctx.fillRect(0, 0, ml.overlay.cW, ml.overlay.cH);
			ml.overlay.animations.forEach(function(anim) {
				anim.animatables.forEach(function(animatable) {
					animatable.target.draw();
				});
			});
		}
	});
	// Pause it and only play when needed
	ml.overlayAnimation.pause();

	$('.header-title').each(function(){
		$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});
}

ml.animateHeader = function() {
	anime({
		targets: '.header-title .letter',
		rotateY: [-360, 0],
		duration: 1300,
		easing: "easeOutExpo",
		delay: function(el, i) {
			return 45 * i;
		}
	});
}

ml.onlyPlayVisible = function() {
	// Don't play if any overlays are playing
	if (ml.isShowingSource || app.menuVisible) return;
	ml.compositions.each(function(i, e) {
		ml.compShouldPlay(this) ? ml.playComposition(this) : ml.pauseComposition(this);
	});
}

ml.compShouldPlay = function(comp) {
	var winHeight = window.innerHeight;
	var bounds = comp.getBoundingClientRect();
	var offset = 180; // Greater offset -> comps will play less often

	// Check if bottom of comp is above view or if top of comp is below view
	if (bounds.bottom < 0+offset || bounds.top > winHeight-offset) return false;
	return true;
}

ml.playComposition = function(comp) {
	var compID = $(comp).find("h1").attr("class");
	ml.timelines[compID].play();
}

ml.restartComposition = function(comp) {
	var compID = $(comp).find("h1").attr("class");
	ml.timelines[compID].restart();
}

ml.pauseComposition = function(comp) {
	var compID = $(comp).find("h1").attr("class");
	ml.timelines[compID].pause();
}

ml.pauseAllCompositions = function() {
	ml.compositions.each(function(i, e) {
		ml.pauseComposition(this);
	});
}

// Displaying compositions
ml.showComposition = function(comp, e, options) {
	if ($(comp).hasClass("composition-active")) return;
	var $comp = $(comp).parent();
	ml.showSourceForComposition($comp, e, options);
}

ml.prependHTMLwithJS = function(html) {
	var cdn = "https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js";
	var scriptTag = '<script src="' + cdn + '"></script>';
	var scripts = ml.escapeHTML(scriptTag);

	return html + "\n\n" + scripts;
}

ml.escapeHTML = function(html) {
	var text = document.createTextNode(html);
	var div = document.createElement('div');
	div.appendChild(text);

	return div.innerHTML;
}

// ml.removeInternalJSFromCode = function(code) {
// 	// Remove the line where it's stored in ML for pausing/playing
// 	var startPosition = code.indexOf("ml.timelines[");
// 	var endPosition = code.indexOf("anime.timeline(");

// 	return code.slice(0, startPosition) + code.slice(endPosition, code.length);
// }

ml.showSourceForComposition = function(c, e, options) {
	ml.isShowingSource = true;

	// Hide ad, then refresh it, so it can be displayed in a new position with a new ad
	$(".ml-carbon-ad").hide().css("opacity", "0").addClass("ml-carbon-ad-source-showing").show();

	$("html").addClass("is-showing-source");
	$(c).addClass("composition-active");
	ml.pauseAllCompositions();
	ml.updateHashForComposition(c);

	// Play chosen composition from beginning
	ml.restartComposition(c);
	ml.pauseComposition(c);
	app.menu.hideMenuIcon();
	ml.showOverlay(c, e);

	// Prepare to animate in overlay elements
	$(".composition-back-button").show().css("opacity", "0");
	$(".composition-source-text").css("opacity", "0");
	$(".composition-source").show();
	$(".composition-source-container").css("transform", "scaleX(0)").show();

	// Animate in overlay elements
	anime.timeline()
	.add({
		targets: ".composition-source-container",
		scaleX: [0, 1],
		duration: 900,
		delay: 500,
		easing: "easeOutExpo",
		complete: function() {
			ml.playComposition(c);
		}
	}).add({
		targets: ".composition-source-text",
		opacity: 1,
		translateY: [-50, 0],
		delay: function(el, i) {
			return 50 * i;
		},
		easing: "easeOutExpo",
		offset: "-=150"
	}).add({
		targets: ".ml-carbon-ad",
		opacity: 1,
		easing: "easeOutExpo",
		offset: "-=1250"
	});

	anime({
		targets: ".composition-back-button",
		opacity: [0,1],
		easing: "easeOutExpo",
		delay: 300,
		translateX: [-40, 0]
	});
}

ml.hideSource = function() {
	if (!ml.isShowingSource) return;
	ml.isShowingSource = false;
	ml.resetHash();

	$(".ml-carbon-ad").hide().css("opacity", "0");
	// ml.refreshAd();

	$("html").removeClass("is-showing-source");
	ml.onlyPlayVisible();
	$(".composition-active").removeClass("composition-active");
	
	anime({
		targets: ".composition-source-text",
		opacity: 0,
		duration: 400,
		easing: "easeInQuad"
	});

	anime({
		targets: ".composition-source-container",
		translateX: "100%",
		duration: 500,
		easing: "easeInQuad",
		complete: function() {
			// Reset scroll position (could have changed if you opened before and scrolled)
			$(".composition-source").scrollTop(0).hide();
		}
	});

	anime.timeline()
		.add({
			targets: ".color-overlay",
			opacity: 0,
			easing: "easeInQuad",
			duration: 600,
			complete: function() {
				$(".color-overlay").hide();
				ml.overlay.bgColor = "transparent";
				ml.overlay.ctx.clearRect(0,0, ml.overlay.cW, ml.overlay.cH);
				ml.overlayAnimation.pause();
			}
		}).add({
			begin: function() {
				$(".ml-carbon-ad").removeClass("ml-carbon-ad-source-showing").show();
			},
			targets: ".ml-carbon-ad",
			opacity: 1,
			duration: 500,
			easing: "easeInQuad",
		});

	anime({
		targets: ".composition-back-button",
		opacity: [1,0],
		easing: "easeInQuad",
		translateX: [0, -40],
		duration: 300,
		complete: function() {
			$(".composition-back-button").hide();
			app.menu.showMenuIcon();
		}
	});
}

ml.updateHashForComposition = function(c) {
	var $comp = $(c).parent();
	var ID = $(".composition").index($comp) + 1;
	window.location.hash = ID;
}

ml.resetHash = function() {
	var scrollTop = $(document).scrollTop();
	window.location.hash = "";
	$(document).scrollTop(scrollTop);
}

ml.loadCompositionFromCurrentHash = function() {
	var hash = window.location.hash;
	if (hash == "") return;
	ml.loadCompositionForHash(hash);
}

ml.loadCompositionForHash = function(hash) {
	var ID = parseInt(hash.substr(1,2));
	var comp = $(".composition")[ID-1];
	var rect = comp.getBoundingClientRect();
	$(document).scrollTop(rect.top);
	ml.showComposition($(comp).find(".composition-wrapper"), {});
}

// ml.refreshAd = function() {
//   if (!$("#carbonads")[0]) return;
//   if (typeof _carbonads !== 'undefined') _carbonads.refresh();
// }

ml.removeAnimation = function(animation) {
	var index = ml.overlay.animations.indexOf(animation);
	if (index > -1) ml.overlay.animations.splice(index, 1);
}

ml.calcPageFillRadius = function(x, y) {
	var l = Math.max(x - 0, ml.overlay.cW - x);
	var h = Math.max(y - 0, ml.overlay.cH - y);
	return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

ml.showOverlay = function(c, e) {
	ml.overlayAnimation.play();
	$(".color-overlay").show().css("opacity", "1");

	if (e.touches) { 
		e.preventDefault();
		e = e.touches[0];
	}

	var circleSpawnX = e.clientX ? e.clientX : ml.horizontalCenterForElement($(c).parent()[0]);
	var circleSpawnY = e.clientY ? e.clientY : ml.verticalCenterForElement($(c).parent()[0]);

	var fillColor = "#" + $(c).attr("data-color");
	var targetR = ml.calcPageFillRadius(circleSpawnX, circleSpawnY);
	var minCoverDuration = 750;
	
	var pageFill = new Circle({
		x: circleSpawnX,
		y: circleSpawnY,
		r: 0,
		fill: fillColor
	});

	var fillAnimation = anime({
		targets: pageFill,
		r: targetR,
		duration:  Math.max(targetR / 2 , minCoverDuration ),
		easing: "easeOutQuart",
		complete: function(){
			ml.overlay.bgColor = pageFill.fill;
			ml.overlayAnimation.pause();
			ml.removeAnimation(fillAnimation);
		}
	});
	
	ml.overlay.animations.push(fillAnimation);
}

function extend(a, b){
	for(var key in b) {
		if(b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}

ml.horizontalCenterForElement = function(element) {
	var rect = element.getBoundingClientRect();
	return rect.left + rect.width / 2;
}

ml.verticalCenterForElement = function(element) {
	var rect = element.getBoundingClientRect();

	return rect.top + rect.height / 2 + 50;
}

var Circle = function(opts) {
	extend(this, opts);
}

Circle.prototype.draw = function() {
	ml.overlay.ctx.globalAlpha = this.opacity || 1;
	ml.overlay.ctx.beginPath();
	ml.overlay.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

	if (this.fill) {
		ml.overlay.ctx.fillStyle = this.fill;
		ml.overlay.ctx.fill();
	}
	ml.overlay.ctx.closePath();
	ml.overlay.ctx.globalAlpha = 1;
}

ml.overlay.resizeCanvas = function() {
	ml.overlay.cW = window.innerWidth;
	ml.overlay.cH = window.innerHeight;
	ml.overlay.c.width = ml.overlay.cW * devicePixelRatio;
	ml.overlay.c.height = ml.overlay.cH * devicePixelRatio;
	ml.overlay.ctx.scale(devicePixelRatio, devicePixelRatio);
	ml.overlay.ctx.fillStyle = ml.overlay.bgColor;
	ml.overlay.ctx.fillRect(0, 0, ml.overlay.cW, ml.overlay.cH);
};

export default ml;