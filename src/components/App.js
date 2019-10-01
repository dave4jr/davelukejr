/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	App Component
 *========================================*/
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Header from './Header.js';

class App extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Header />
		)
	}
}

export default App;