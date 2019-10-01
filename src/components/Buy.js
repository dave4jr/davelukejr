/*========================================
 *  Author:		 	Dave Luke Jr
 *  Description:	Buy React Component
 *========================================*/
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Fuse from 'fuse.js';
import Card from '../components/Card.js';
import Pagination from '../components/Pagination.js';
import FilterBar from '../components/FilterBar.js';
import Map from '../components/Map.js';
import propertyLoader from '../assets/img/loader-orange.svg';


export default class Buy extends React.PureComponent {
	
	constructor(props) {
		super(props);
		this.handleSearchChange = _.debounce(this.handleSearchChange, 800);
		this.resizeWindow = _.debounce(this.resizeWindow, 400);
		this.state = {
			page: 1,
			per_page: 20,
			properties: [],
			properties_list: [],
			show_pagination: "block",
			show_no_properties_found: "none",
			cities: [],
			sections: [],
			views: [],
			search: [],
			bedrooms: 0,
			bathrooms: 0,
			price_min: "no_min",
			price_max: "no_max",
			views: [{value:"all", label:"All", isChecked:true}, {value:"mountain", label:"Mountain View", isChecked:true}, {value:"lake", label:"Lake View", isChecked:true}, {value:"river", label:"River View", isChecked:true}, {value:"riverfront", label:"Riverfront", isChecked:true}, {value:"golf", label:"Golf Course", isChecked:true}]
		};
	}
	
	updateListingRowMargin = () => {
		const margin_top = (window.innerWidth > 1024) ? "148px" : "130px";
		$(".listing-row:not(.vertical):visible:first").css("margin-top", margin_top);
	}
	
	resizeWindow = () => {
		this.updateListingRowMargin();
	}
	
	getPropertyList = (properties, page) => {
		
		// Init Variables
		const rmax = ((page - 1) * this.state.per_page) + this.state.per_page;
		let rmax_visible = properties.length;
		let count_visible = 0;
		let count_all = 0;
		let properties_list = [];
		let show_pagination = this.state.show_pagination;
		
		// Property Visibility
		if (properties && properties.length > 0){
			properties.forEach(property => {
				if (property.visible){
					count_visible = (count_visible <= rmax) ? count_visible + 1 : count_visible;
				}
				count_all = count_all + 1;
				if (count_visible === rmax){
					rmax_visible = count_all;
				}
			});
			
			// Show / Hide Pagination
			const show_pagination = (count_visible > this.state.per_page) ? "block" : "none";
			const show_no_properties_found = (count_visible <= 0) ? "block" : "none";
			
			this.setState({
				show_pagination: show_pagination,
				show_no_properties_found: show_no_properties_found
			});
			
			return _.slice(properties, 0, rmax_visible);
		} else {
			return [];
		}
	}
	
	componentDidMount() {
		
		// Show Property Loader
		$("#loader").show();
		$(".pagination").hide();
		$("#left-col").css("height", $("#right-col").innerHeight());
		
		// Get Properties From Database
		axios.get("http://bs.ngrok.io/rets/api/").then(response => {
			
			// Return If Unmounted
			if (this.unmounted) return;
			
			// Properties Response
			const properties = response.data.data;
			const cities = [], sections = [];
			
			// Building Filter Options From Data
			properties.map((property, key) => {
				cities.push({value:property.city, isChecked:true});
				sections.push({value:property.section, isChecked:true});
			});
			
			// Paginating Properties
			const properties_list = this.getPropertyList(properties, this.state.page);
			
			// Cities
			const cities_sorted = _.orderBy(_.uniqBy(cities, "value"), ['value'], ['asc']);
			const cities_all = cities_sorted.unshift({value:"All", isChecked:true});
			
			// Sections
			const sections_sorted = _.orderBy(_.uniqBy(sections, "value"), ['value'], ['asc']);
			const sections_all = sections_sorted.unshift({value:"All", isChecked:true})

			this.setState({
				properties: properties,
				properties_list: properties_list,
				cities: cities_sorted,
				sections: sections_sorted,
			});
			
			// Remove Loader
			window.scrollTo(0, 0);
			this.updateListingRowMargin();
			$(".pagination").show();
			$("#loader").hide();
		});
		window.addEventListener("resize", this.resizeWindow);
	}
	
	componentDidUpdate(){
		this.updateListingRowMargin();
	}
	
	componentWillUnmount(){
		this.unmounted = true;
		window.removeEventListener("resize", this.resizeWindow);
	}
	
	handleCityChange = (event) => {
		const cities = this.state.cities;
		if (event.currentTarget.value === "All"){
			cities.forEach(city => city.isChecked = event.currentTarget.checked);
		} else {
			cities.forEach(city => {
				if (city.value === event.currentTarget.value){
					city.isChecked = event.currentTarget.checked;
				}
			});
		}
		this.setState(
			{cities: cities},
			() => this.filterProperties()
		);
	}
	
	handleSectionChange = (event) => {
		const sections = this.state.sections;
		if (event.currentTarget.value === "All"){
			sections.forEach(section => section.isChecked = event.currentTarget.checked);
		} else {
			sections.forEach(section => {
				if (section.value === event.currentTarget.value){
					section.isChecked = event.currentTarget.checked;
				}
			});
		}
		this.setState(
			{sections: sections},
			() => this.filterProperties()
		);
	}
	
	handleViewChange = (event) => {
		const views = this.state.views;
		const target = event.currentTarget;
		if (target.value === "all"){
			views.forEach(view => view.isChecked = target.checked);
		} else {
			views.forEach(view => {
				if (view.value === target.value){
					view.isChecked = target.checked;
				}
			});
		}
		this.setState(
			{views: views},
			() => this.filterProperties()
		);
	}
	
	handleSearchChange = (value) => {
		let results;
		const search = value;
		if (search && search.length > 0){
			const options = {
				shouldSort: true,
				threshold: 0,
				keys: ["title", "city", "state", "county"],
				id: "mls"
			};
			const fuse = new Fuse(this.state.properties, options);
			results = fuse.search(search);
		} else {
			results = false;
		}
		this.setState(
			{search: results},
			() => this.filterProperties()
		);
	}
	
	handleRoomChange = (event) => {
		const input = event.currentTarget.querySelector("input");
		this.setState(
			{[input.name]: input.value},
			() => this.filterProperties()
		);
	}
	
	handlePriceSelect = (event) => {
		const target = event.currentTarget;
		this.setState(
			{["price_" + target.name]: target.value},
			() => this.filterProperties()
		);
	}
	
	filterProperties = () => {
		const properties = this.state.properties;
		const cities_checked = _.map(_.filter(this.state.cities, {"isChecked":true}),"value");
		const sections_checked = _.map(_.filter(this.state.sections, {"isChecked":true}),"value");
		const views_checked = _.map(_.filter(this.state.views, {"isChecked":true}),"value");
		console.log(views_checked);
		let view_match = false;
		
		// Property Visibility
		properties.forEach(property => {
			
			// City Filter
			if (_.includes(cities_checked, property.city)){
				
				// Section Filter
				if (_.includes(sections_checked, property.section)){
					
					// Bedrooms / Bathrooms Filter
					if (property.beds >= this.state.bedrooms && property.baths >= this.state.bathrooms){
						
						// Price - Min/Max Filter
						if ((this.state.price_min === "no_min" && this.state.price_max === "no_max") || (this.state.price_min === "no_min" && property.price_num <= this.state.price_max) || (this.state.price_max === "no_max" && property.price_num >= this.state.price_min) || (property.price_num >= this.state.price_min && property.price_num <= this.state.price_max)){
							
							// View Filter
							view_match = false;
							property.view.map(view => {
								if (_.includes(views_checked, view)){
									view_match = true;
								}
							});
							if (view_match){
								property.visible = false;
							} else {
								property.visible = false;
							}
							
						} else {
							property.visible = false;
						}
					} else {
						property.visible = false;
					}
				} else {
					property.visible = false;
				}
			} else {
				property.visible = false;
			}
		});
		const properties_list = this.getPropertyList(properties, this.state.page);
		
		this.setState({
			properties: properties,
			properties_list: properties_list,
		});
		
		// Set Margin-Top To 0px After Filter
		$.each($(".listing-row:not(.vertical):visible"), function(index, val) {
			$(this).css("margin-top", "0px");
		});
	}
	
	loadMore = (event) => {
		event.currentTarget.classList.add('loading');
		const properties_list = this.getPropertyList(this.state.properties, (this.state.page + 1));
		this.setState({
			page: (this.state.page + 1),
			properties_list: properties_list
		});
		event.currentTarget.classList.remove('loading');
	}
	
	render() {
		return (
			<div className="container-fluid grey-bg fullwidth-wrapper">
				<div className="row">
					<div id="left-col" className="col-sm-4 p-b-100 p-rl-5">
					
						{/* FilterBar */}
						<FilterBar handleViewChange={this.handleViewChange} views={this.state.views} handlePriceSelect={this.handlePriceSelect} handleRoomChange={this.handleRoomChange} handleSearchChange={this.handleSearchChange} handleCityChange={this.handleCityChange} cities={this.state.cities} handleSectionChange={this.handleSectionChange} sections={this.state.sections}/>
						
						{/* Properties Loader */}
						<div id="loader">
							<div className="map-loader"></div>
							<h6>Loading Properties...</h6>
						</div>
						
						{/* No Properties Found */}
						<div className="listing-row no-results animated bounceInDown" style={{display: this.state.show_no_properties_found}}>
							<p><span>0</span> properties match your search criteria</p>
						</div>
						
						{/* Properties & Pagination */}
						<div id="properties">
							{this.state.properties_list.map(property => <Card key={property.pk} {...property} /> )}
							<Pagination loadMore={this.loadMore} show_pagination={this.state.show_pagination} />
						</div>
					</div>
					<div id="right-col" className="col-sm-8 p-rl-0">
						<div className="map-div">
							<Map properties={this.state.properties} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
