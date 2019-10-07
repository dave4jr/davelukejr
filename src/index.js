/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Render
 *========================================*/
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import App from './components/App.js';

const root = document.getElementById('root');
if (root){
	ReactDOM.render(
		<App />,
		root
	)
}

