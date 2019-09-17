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
	d3.select("#cancel-btn").on("click", () => {d3.select("#datetime").node().value = ""; filterByDate();});
	d3.select("#datetime").on("keyup", () => filterByDate()).on("keypress", () => {
		if(d3.event.keyCode === 13){ // pressed Enter
			d3.event.preventDefault();
			d3.event.stopPropagation();
		}
	});
	
	// Date filter
	const filterByDate = () => {
		// Get filter value
		let filter = d3.select("#datetime").node().value;

		if(Boolean(filter)){
			// Use Regex for filtering
			rows.classed("is-hidden", p => p.datetime.search(new RegExp(`.*${filter}.*`))); 	
		}else{		
			// No filter value, show all rows
			rows.classed("is-hidden", p => false);
		}
	};
})();

