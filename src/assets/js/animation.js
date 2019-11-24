/*=========================================
 *  Author:			Dave Luke Jr
 *  Description:	Animation Effects
 *=========================================*/

$('.effect1 .letters').each(function() {
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
