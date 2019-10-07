/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Header Component
 *========================================*/
import React from 'react';


const Header = (props) => {
	return (
		<div className="header">
			<div className="site-nav-animation-wrapper menu-animation-wrapper">
				<div className="site-nav-animated-background menu-animated-background"></div>
			</div>
			<a className="menu menu-white menu-movingLetters" href="">
				<span className="menu-icon-line-1 menu-icon-line"></span>
				<span className="menu-icon-line-2 menu-icon-line"></span>
				<span className="menu-icon-line-3 menu-icon-line"></span>
			</a>
			<div className="site-nav-overlay js-nav">
				<div className="nav-content">
					<div className="js-nav-header nav-header">
						<span className="nav-header-text">Dave Luke Jr</span>
						<div className="nav-header-line js-nav-header-line"></div>
					</div>
					<ul className="nav-categories">
						<li className="nav-category js-nav-animate"><a href="" className="nav-link">Passions</a></li>
						<li className="nav-category js-nav-animate"><a href="" className="nav-link">About</a></li>
						<li className="nav-category js-nav-animate"><a href="" className="nav-link">Contact</a></li>
						<li className="nav-category js-nav-animate"><a href="" className="nav-link">Resources</a></li>
						<li className="nav-category js-nav-animate"><a href="" className="nav-link">Search</a></li>
					</ul>
				</div>
			</div>
			<h1 className="header-title">Dave Luke Jr</h1>
		</div>
	)
}
export default Header;