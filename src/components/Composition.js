/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Composition Component
 *========================================*/
import React from 'react';
import $ from 'jquery';
import anime from 'animejs/lib/anime.es.js';


const Composition = (props) => {
	
	$('.ml1 .letters').each(function() {
		$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});

	ml.timelines["ml1"] = anime.timeline({
			loop: true
		})
		.add({
			targets: '.ml1 .letter',
			scale: [0.3, 1],
			opacity: [0, 1],
			translateZ: 0,
			easing: "easeOutExpo",
			duration: 600,
			delay: function(el, i) {
				return 70 * (i + 1)
			}
		}).add({
			targets: '.ml1 .line',
			scaleX: [0, 1],
			opacity: [0.5, 1],
			easing: "easeOutExpo",
			duration: 700,
			offset: '-=875',
			delay: function(el, i, l) {
				return 80 * (l - i);
			}
		}).add({
			targets: '.ml1',
			opacity: 0,
			duration: 1000,
			easing: "easeOutExpo",
			delay: 1000
		});
	
	
	return (
		<div className="composition" style={{backgroundColor: props.bg}}>
			<div className="composition-wrapper" data-color={props.bg}>
				<h1 className={props.effect}>
					<span className="text-wrapper">
						<span className="line line1"></span>
						<span className="letters">{props.text}</span>
						<span className="line line2"></span>
					</span>
				</h1>
			</div>
		</div>
	)
}
export default Composition;