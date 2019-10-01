/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	FilterBar Component
 *========================================*/
import React from 'react';
import _ from 'lodash';


const FilterBar = (props) => {
	
	const rooms = {
		bedrooms: ["Studio+", "1+", "2+", "3+", "4+", "5+"],
		bathrooms: ["Any", "1+", "2+", "3+", "4+", "5+"],
	}
	
	return (
		<div id="filter-bar">
			<form id="filter-form">
			
				{/* City */}
				<div id="city-filter" className="dropdown m-r-5">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown"> City </a>
					<div className="dropdown-menu p-t-10 p-l-5 coloured">
						<div className="checkbox-wrapper">
					        {props.cities.map((city, kk) => (
					    		<div key={kk} className="checkbox">
					    			<label>
					    				<input onChange={props.handleCityChange} value={city.value} checked={city.isChecked} type="checkbox"/>
					    				<span className="checkbox-material"><span className="check"></span></span><span className="check-label">{city.value}</span>
					    			</label>
					    		</div>
					        ))}
					    </div>
					</div>
				</div>
				
				{/* Section */}
				<div id="section-filter" className="dropdown m-r-5">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown"> Section </a>
					<div className="dropdown-menu p-t-10 p-l-5 coloured">
						<div className="checkbox-wrapper">
					        {props.sections.map((section, kk) => (
					    		<div key={kk} className="checkbox">
					    			<label>
					    				<input onChange={props.handleSectionChange} value={section.value} checked={section.isChecked} type="checkbox"/>
					    				<span className="checkbox-material"><span className="check"></span></span><span className="check-label">{section.value}</span>
					    			</label>
					    		</div>
					        ))}
					    </div>
					</div>
				</div>
				
				{/* Rooms */}
				<div id="rooms-filter" className="dropdown m-r-5">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown"> Rooms </a>
					<div className="dropdown-menu">
					
						{/* Bedrooms */}
						<label>Bedrooms</label>
						<div className="btn-group" data-toggle="buttons">
							{rooms.bedrooms.map((bedroom, kk) => {
								const isActive = (kk === 0) ? "btn active" : "btn";
								return (
								    <label onClick={props.handleRoomChange} key={kk} className={isActive}>
										<input value={kk} name="bedrooms" className="btn" type="radio"/>
										{bedroom}
									</label>
								)
						    })}
						</div>
						
						{/* Bathrooms */}
						<label>Bathrooms</label>
						<div className="btn-group" data-toggle="buttons">
							{rooms.bathrooms.map((bathroom, kk) => {
								const isActive = (kk === 0) ? "btn active" : "btn";
								return (
								    <label onClick={props.handleRoomChange} key={kk} className={isActive}>
										<input value={kk} name="bathrooms" className="btn" type="radio"/>
										{bathroom}
									</label>
								)
						    })}
						</div>
					</div>
				</div>
				
				
				{/* Price - Min/Max */}
				<div id="price-filter" className="range-filter dropdown m-r-5">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown">Price</a>
					<div className="dropdown-menu">
						<select onChange={props.handlePriceSelect} name="min" className="form-control gt">
							<option value="no_min">No Min</option>
							<option value="25000">$25k</option>
							<option value="50000">$50k</option>
							<option value="100000">$100k</option>
							<option value="150000">$150k</option>
							<option value="200000">$200k</option>
							<option value="250000">$250k</option>
							<option value="300000">$300k</option>
							<option value="350000">$350k</option>
							<option value="400000">$400k</option>
							<option value="450000">$450k</option>
							<option value="500000">$500k</option>
							<option value="550000">$550k</option>
							<option value="600000">$600k</option>
							<option value="650000">$650k</option>
							<option value="700000">$700k</option>
							<option value="750000">$750k</option>
							<option value="800000">$800k</option>
							<option value="850000">$850k</option>
							<option value="900000">$900k</option>
							<option value="950000">$950k</option>
							<option value="1000000">$1m</option>
							<option value="1100000">$1.1m</option>
							<option value="1200000">$1.2m</option>
							<option value="1250000">$1.3m</option>
							<option value="1400000">$1.4m</option>
							<option value="1500000">$1.5m</option>
							<option value="1600000">$1.6m</option>
							<option value="1700000">$1.7m</option>
							<option value="1800000">$1.8m</option>
							<option value="1900000">$1.9m</option>
							<option value="2000000">$2m</option>
							<option value="2250000">$2.25m</option>
							<option value="2500000">$2.5m</option>
							<option value="2750000">$2.75m</option>
							<option value="3000000">$3m</option>
							<option value="3500000">$3.5m</option>
							<option value="4000000">$4m</option>
							<option value="4500000">$4.5m</option>
							<option value="5000000">$5.0m</option>
							<option value="10000000">$10.0m</option>
							<option value="20000000">$20.0m</option>
					  	</select>
					  	<span className="p-rl-10">-</span>
					  	<select onChange={props.handlePriceSelect} name="max" className="form-control lt">
				  			<option value="no_max">No Max</option>
				  			<option value="25000">$25k</option>
				  			<option value="50000">$50k</option>
				  			<option value="100000">$100k</option>
				  			<option value="150000">$150k</option>
				  			<option value="200000">$200k</option>
				  			<option value="250000">$250k</option>
				  			<option value="300000">$300k</option>
				  			<option value="350000">$350k</option>
				  			<option value="400000">$400k</option>
				  			<option value="450000">$450k</option>
				  			<option value="500000">$500k</option>
				  			<option value="550000">$550k</option>
				  			<option value="600000">$600k</option>
				  			<option value="650000">$650k</option>
				  			<option value="700000">$700k</option>
				  			<option value="750000">$750k</option>
				  			<option value="800000">$800k</option>
				  			<option value="850000">$850k</option>
				  			<option value="900000">$900k</option>
				  			<option value="950000">$950k</option>
				  			<option value="1000000">$1m</option>
				  			<option value="1100000">$1.1m</option>
				  			<option value="1200000">$1.2m</option>
				  			<option value="1250000">$1.3m</option>
				  			<option value="1400000">$1.4m</option>
				  			<option value="1500000">$1.5m</option>
				  			<option value="1600000">$1.6m</option>
				  			<option value="1700000">$1.7m</option>
				  			<option value="1800000">$1.8m</option>
				  			<option value="1900000">$1.9m</option>
				  			<option value="2000000">$2m</option>
				  			<option value="2250000">$2.25m</option>
				  			<option value="2500000">$2.5m</option>
				  			<option value="2750000">$2.75m</option>
				  			<option value="3000000">$3m</option>
				  			<option value="3500000">$3.5m</option>
				  			<option value="4000000">$4m</option>
				  			<option value="4500000">$4.5m</option>
				  			<option value="5000000">$5.0m</option>
				  			<option value="10000000">$10.0m</option>
				  			<option value="20000000">$20.0m</option>
				  	  	</select>
					</div>
				</div>
				
				
				{/* Views */}
				<div id="view-filter" className="dropdown m-r-5">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown"> View </a>
					<div className="dropdown-menu p-t-10 p-l-5 coloured">
						<div className="checkbox-wrapper">
					        {props.views.map((view, kk) => (
					    		<div key={kk} className="checkbox">
					    			<label>
					    				<input onChange={props.handleViewChange} value={view.value} checked={view.isChecked} type="checkbox"/>
					    				<span className="checkbox-material"><span className="check"></span></span><span className="check-label">{view.label}</span>
					    			</label>
					    		</div>
					        ))}
					    </div>
					</div>
				</div>
				
				
				{/* More */}
				<div id="more-filter" className="dropdown">
					<a className="sr-button button-3 button-tiny filter-btns" data-backdrop="static" data-toggle="dropdown"> More... </a>
					<div className="dropdown-menu">
						<ul>
							<li>
								<div id="sqft-filter" className="range-filter">
									<label>Square Feet</label>
									<input className="form-control gt" min="0" placeholder="Sqft. Min" type="number"/>
									<span className="p-rl-10">-</span>
									<input className="form-control lt" min="0" placeholder="Sqft. Min" type="number"/>
								</div>
							</li>
							<li>
								<div id="year-built-filter" className="range-filter">
									<label>Year Built</label>
									<input className="form-control gt" max="2019" min="1800" placeholder="Year Min" type="number"/>
									<span className="p-rl-10">-</span>
									<input className="form-control lt" max="2019" min="1800" placeholder="Year Min" type="number"/>
								</div>
							</li>
							<li>
								<div id="lot-size-filter" className="range-filter">
									<label>Lot Size</label>
									<input className="form-control gt" min="0" placeholder="Acres Min" step="any" type="number"/>
									<span className="p-rl-10">-</span>
									<input className="form-control lt" min="0" placeholder="Acres Min" step="any" type="number"/>
								</div>
							</li>
							<li>
								<div id="dom-filter">
									<label>Days On Market</label>
									<select className="form-control">
										<option value="0">Any</option>
										<option value="7">&lt; 7 Days</option>
										<option value="15">&lt; 15 Days</option>
										<option value="30">&lt; 30 Days</option>
										<option value="45">&lt; 45 Days</option>
										<option value="60">&lt; 60 Days</option>
										<option value="90">&lt; 90 Days</option>
										<option value="183">&lt; 6 Months</option>
										<option value="365">&lt; 1 Year</option>
									</select>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="filter-bottom-row">

					{/* Favorites */}
					<a className="btn-favorite m-r-5">
						<i className="fontello-heart-3"></i>
					</a>
					
					{/* Search */}
					<div className="filter-search-wrapper">
						<input onChange={(event) => props.handleSearchChange(event.currentTarget.value)} className="filter-search" placeholder="Search..."/>
					</div>
				</div>
			</form>
		</div>
	)
}
export default FilterBar;