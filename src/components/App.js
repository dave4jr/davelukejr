/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	App React Component
 *========================================*/
import React from 'react';
import Header from './Header.js';
import Composition from './Composition.js';


class App extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div id="app">
				<canvas className="color-overlay" id="color-overlay"></canvas>
				<Header />
				<div className="compositions">
					<Composition effect="effect8" punctuation="!" circle="#415E8C" background="#F4F0F2" color="#fff" text="Hi"/>
					<Composition effect="effect5" background="#D97B59" color="#fff" text="Wood Metal"/>
					<Composition effect="effect6" background="#415E8C" color="#fff" text="Dave Luke Jr"/>
					<Composition effect="effect4" background="#333" color="#fff" text="I Am Dave"/>
					<Composition effect="effect4" background="#2C3B59" color="#fff" text="I Am Dave"/>
					<Composition effect="effect4" background="#9A654D" color="#fff" text="I Am Dave"/>
					<Composition effect="effect4" background="#BFA694" color="#fff" text="I Am Dave"/>
					<Composition effect="effect4" background="#5F7A85" color="#fff" text="I Am Dave"/>
				</div>
				<div className="collection-footer-info">
					
				</div>
			</div>
		)
	}
}

export default App;