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
	d3.select("#filter-btn").on("click", () => filterByDate());
	d3.select("#datetime").on("keypress", () => {
		if(d3.event.keyCode === 13){ // pressed Enter
			d3.event.preventDefault();
			d3.event.stopPropagation();
		}
		filterByDate();
	});
	
	const filterByDate = () => {
		// Get filter value
		let filter = d3.select("#datetime").node().value;
		if(! filter){
			// no filter value, show all rows
			return rows.classed("is-hidden", p => false); 
		}
		// search - use regular expression and allow any section of date to match searching string
		let regex =  new RegExp(`.*${filter}.*`); 
		rows.classed("is-hidden", p =>  p.datetime.search(regex));
	};
})();

