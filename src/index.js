/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Render
 *========================================*/
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/inter-ui.css';
import './assets/css/moving-letters.css';
// import './assets/js/anime.min.js';
// import './assets/js/anime.min.js';
// import './assets/js/app.js';
// import './assets/js/movning-letters.js';
import App from './components/App.js';

const root = document.getElementById('root');
if (root){
	ReactDOM.render(
		<App />,
		root
	)
}

