/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	App React Component
 *========================================*/
import React from 'react';
import Header from './Header.js';
import Composition from './Composition.js';


//<div className="collection-footer-info">
//</div>

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
					<Composition effect="effect8" circle="#335062" background="#A5D1DA" color="#fff" text="Hi"/>
					<Composition effect="effect4" background="#E0D5BB" color="#fff" text="My Name Is Dave"/>
					<Composition effect="effect13" background="#3D5742" color="#fff" text="I Am Dave"/>
					<Composition effect="effect1" background="#DF7360" color="#fff" text="I Am Dave"/>
					<Composition effect="effect5" background="#335062" color="#fff" text="Wood Metal"/>
					<Composition effect="effect11" background="#E5B7B7" color="#fff" text="Hello"/>
					<Composition effect="effect6" background="#A5D1DA" color="#fff" text="Dave Luke Jr"/>
					<Composition effect="effect15" background="#C7C1BB" color="#fff" text="I Am Dave"/>
				</div>
			</div>
		)
	}
}

export default App;