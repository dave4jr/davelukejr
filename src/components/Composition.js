/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Composition Component
 *========================================*/
import React from 'react';
// import $ from 'jquery';
import _ from 'lodash';
import effects from '../assets/js/effects.js';


class Composition extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount(){
		effects(this.props.effect);
		
		
	}
	
	render() {
		let effect;
		if (_.includes(["effect1"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				<span className="text-wrapper">
					<span className="line line1"></span>
					<span className="letters">{this.props.text}</span>
					<span className="line line2"></span>
				</span>
			</h1>
			
		} else if (_.includes(["effect2", "effect3", "effect12", "effect13"], this.props.effect)){
			effect = <h1 className={this.props.effect}>{this.props.text}</h1>
			
		} else if (_.includes(["effect4"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				{_.split(this.props.text, " ").map((letter, kk) => {
					return <span key={kk} className={"letters letters-" + kk}>{letter}</span>
				})}
			</h1>
			
		} else if (_.includes(["effect5"], this.props.effect)){
			const letters = _.split(this.props.text, " ")
			const left = letters[0];
			const right = letters[1];
			effect = <h1 className={this.props.effect}>
				<span className="text-wrapper">
					<span class="line line1"></span>
					<span class="letters letters-left">{left}</span>
					<span class="letters ampersand">&amp;</span>
					<span class="letters letters-right">{right}</span>
					<span class="line line2"></span>
				</span>
			</h1>
			
		} else if (_.includes(["effect6", "effect7", "effect9", "effect10"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				<span className="text-wrapper">
					<span className="letters">{this.props.text}</span>
				</span>
			</h1>
			
		} else if (_.includes(["effect8"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				<span className="letters-container">
					<span className="letters letters-left">{this.props.text}</span>
					<span className="letters bang">!</span>
				</span>
				<span className="circle circle-white"></span>
				<span className="circle circle-dark"></span>
				<span className="circle circle-container"><span className="circle circle-dark-dashed"></span></span>
			</h1>
			
		} else if (_.includes(["effect11"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				<span className="text-wrapper">
					<span className="line line1"></span>
					<span className="letters">{this.props.text}</span>
				</span>
			</h1>
				
		} else if (_.includes(["effect14"], this.props.effect)){
			effect = <h1 className={this.props.effect}>
				<span className="text-wrapper">
					<span className="letters">{this.props.text}</span>
					<span className="line"></span>
				</span>
			</h1>
				
			
			
			
			
			
			
			
			
			
		}
		
		return (
			<div className="composition" style={{backgroundColor: this.props.bg}}>
				<div className="composition-wrapper" data-color={this.props.bg}>
					{effect}
				</div>
			</div>
		)
	}
}
export default Composition;