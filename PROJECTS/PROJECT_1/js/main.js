d3.csv('data/exoplanets-1.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
        d.sy_snum = +d.sy_snum; // convert string 'sy_snum' to number

    });

    // Initialize chart
    const barchart = new Barchart({ parentElement: '#barchart'}, data);

    barchart.updateVis()
    
})
.catch(error => {
    console.error(console.error());
});

