/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	App Component
 *========================================*/
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Header from './Header.js';
import Composition from './Composition.js';

class App extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div id="app">
				<Header />
				<div className="compositions">
					<Composition bg="#8E8D8A" fg="#444" text="Sup" />
					<Composition bg="#D8C3A5" fg="#444" text="Sup" />
				</div>
			</div>
		)
	}
}

export default App;