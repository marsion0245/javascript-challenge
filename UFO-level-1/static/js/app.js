/*
	Java Script challenge homework
	To add rows to the existing table I choose to build a string containg HTML contructs and insert it into DOM with innerHTML() function. 
	Reason is speed, this is, to my best knowledge the fastest way to add big quatity of elements into DOM.
*/

"use strict";

(function(){
	// Data in data.js, put it into array of strings
	const tblRows = data.map(re => `<tr><td>${re.datetime}</td><td>${re.city}</td><td>${re.state}</td><td>${re.country}</td><td>${re.shape}</td><td>${re.durationMinutes}</td><td>${re.comments}</td></tr>`);

	// Insert rows into table tbody
	d3.select("#ufo-table").select("tbody").html(tblRows.join(""));
		
	d3.select("#filter-btn").on("click", function(){
		let filter = d3.select("#datetime").node().value;
		filterDate(filter);
	});
	
	let filterDate = function(){
		let tableRows = d3.select("#ufo-table").select("tbody").selectAll("tr").style('display','none');
		console.log(tableRows);
//		tableRows.forEach(row => {
			
//			console.log(row);
//		})
		let x = d3.select("#ufo-table").select("tbody").selectAll("tr").filter(function(d){console.log(d); return true;});
	};
	
})();


	
