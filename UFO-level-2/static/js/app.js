/*
	Java Script challenge homework
	Table construction with d3.js (insert rows, cells) uses common solution available on Internet.
*/

"use strict";

(function(){
	// This is IIFE
	
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
	
	// Filter event assignment
	const stringValues = ['datetime', 'city', 'shape'];

	// Activate string filters
	stringValues.forEach(el => d3.select("#f_" + el).on("keyup", () => filterByString(el)).on("keypress", () => cancelEvent()));

	// Execute filter - this is formality since the filters are executed on each button up
	d3.select("#filter-btn").on("click", () => stringValues.forEach(el => filterByString(el)));
	
	// Cancel filter
	d3.select("#cancel-btn").on("click", () => {
		stringValues.forEach(el =>{
			d3.select("#f_" + el).node().value = ""; 
			filterByString(el);
		});
	});
	
	const cancelEvent = () => {
		if(d3.event.keyCode === 13){ 
			// pressed Enter
			d3.event.preventDefault();
			d3.event.stopPropagation();
		}
	};	
	
	// Date filter
	const filterByString = (attrName) => {
		// Get filter value
		let filter = d3.select(`#f_${attrName}`).node().value;
		// let regex = new RegExp(".*" + filter + ".*");
		(Boolean(filter)) ? rows.classed(`f_${attrName}`, p => p[attrName].search(new RegExp(".*" + filter + ".*"))) : rows.classed(`f_${attrName}`, p => false);
	};

})();

