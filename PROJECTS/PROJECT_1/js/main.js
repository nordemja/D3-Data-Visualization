d3.csv('data/exoplanets-1.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    starDict = {};
    star_arr = []

    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
        //d.sy_snum = +d.sy_snum; // convert string 'sy_snum' to number
    
        if (starDict[d.sy_snum] == undefined) {
            starDict[d.sy_snum] = 1
        } else {
            starDict[d.sy_snum] += 1;
        }
    
    });

    for (let i = 0; i < Object.keys(starDict).length; i++) {
        temp = Object();
        temp.star_num = i+1;
        temp.frequency = starDict[i+1];
        star_arr.push(temp);

    }

    console.log(star_arr);

    // Initialize chart and then show it
    barchart = new Barchart({ parentElement: '#barchart'}, star_arr);
    barchart.updateVis();
    
})
.catch(error => {
    console.error(console.error());
});

