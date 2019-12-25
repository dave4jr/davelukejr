/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	App React Component
 *========================================*/
import React from 'react';
// import axios from 'axios';
// import _ from 'lodash';
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
					<Composition effect="effect8" bg="#8E8D8A" fg="#444" text="Hi"/>
				</div>
			</div>
		)
	}
}

export default App;