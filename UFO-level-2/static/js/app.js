/*
	Java Script challenge homework
	Table construction with d3.js (insert rows, cells) uses common solution available on Internet.
*/

"use strict";

(function(){
	// This is IIFE
	
	const ALL = "*";
	
	// -------------------------------------------------------------------------------------------------------------------------------------------------
	// Create table from JSON
	// A bit of text formating
	data.forEach( row  => { 
		row.state = row.state.toUpperCase();
		row.country = row.country.toUpperCase();
		row.city = row.city.replace(/(^|\s|\()\w/g, c => c.toUpperCase());
	});
	
	// Insert rows into table tbody
	let rows = d3.select("#ufo-table").select("tbody").selectAll().data(data).enter().append("tr");

	// Insert cells into rows
    rows.selectAll().data(d => Object.values(d)).enter().append("td").text(d => d);
	

	// -------------------------------------------------------------------------------------------------------------------------------------------------
	// Create filters
	// Filter event assignment
	const stringValues = ['datetime', 'city', 'shape'];

	// Activate string filters
	stringValues.forEach(el => d3.select("#f_" + el).on("keyup", () => filterByRegex(el)).on("keypress", () => cancelEvent()));

	// Activate dropdown filters
	// Country
	let countryList = Array.from( new Set(data.map(v => v.country))).sort(); // Unique sorted list
	countryList.unshift(ALL);
	d3.select("#li-country").append("select").attr("id", "f_country").selectAll("option").data(countryList).enter().append("option").text(c=>c).attr("value", c=>c);

	// State - default value is *
	let stateListDd = d3.select("#li-state").append("select").attr("id", "f_state");
	stateListDd.selectAll("option").data([ALL]).enter().append("option").text(s=>s).attr("value", s=>s);
	
	d3.select("#f_country").on("change", () => {
		let filter = d3.select("#f_country").node().value;
		filter !== ALL ? rows.classed('f_country', p => p.country !== filter) : resetFilter('f_country');

		// update states list based on selected country
		let statesList = [ALL];
		if(filter !== ALL){
			statesList = statesList.concat(Array.from( new Set(data.filter( c => c.country === filter).map(v => v.state))).sort()); // Unique sorted list
		}
		document.getElementById("f_state").innerHTML = "";
		stateListDd.selectAll("option").data(statesList).enter().append("option").text(s=>s).attr("value", s=>s);
	});

	d3.select("#f_state").on("change", () => {
		let filter = d3.select("#f_state").node().value;
		filter !== ALL ? rows.classed('f_state', p => p.state !== filter) : resetFilter('f_state');
	});

	// Execute filter - call from button click - this is formality since the filters are executed on each button up
	d3.select("#filter-btn").on("click", () => stringValues.forEach(el => filterByRegex(el)));
	
	// Cancel filter - call from button click
	d3.select("#cancel-btn").on("click", () => {
		stringValues.forEach(el =>{
			d3.select("#f_" + el).node().value = ""; 
			filterByRegex(el);
		});
		d3.select("#f_country").node().value = ALL;
		d3.select("#f_state").node().value = ALL;
		resetFilter("f_country");
		resetFilter("f_state");
	});
		
	const cancelEvent = () => {
		if(d3.event.keyCode === 13){ 
			// Enter pressed
			d3.event.preventDefault();
			d3.event.stopPropagation();
		}
	};	
	
	// Filter by string
	const filterByRegex = (attrName) => {
		// Get filter value
		let filter = d3.select(`#f_${attrName}`).node().value;
		(Boolean(filter)) ? rows.classed(`f_${attrName}`, p => p[attrName].search(new RegExp(".*" + filter + ".*"))) : resetFilter(`f_${attrName}`); // rows.classed(`f_${attrName}`, p => false);
	};
	
	const resetFilter = param => rows.classed(param, false);
	
})();

