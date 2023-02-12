d3.csv('data/exoplanets-1.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    let = starDict = {};
    let = star_arr = [];

    let = planetDict = {};
    let = planet_arr = [];

    let = discoverDict = {};
    let = discover_arr = [];

    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
        //d.sy_snum = +d.sy_snum; // convert string 'sy_snum' to number
    
        if (starDict[d.sy_snum] == undefined) {
            starDict[d.sy_snum] = 1
        } else {
            starDict[d.sy_snum] += 1;
        }

        if (planetDict[d.sy_pnum] == undefined) {
            planetDict[d.sy_pnum] = 1
        } else {
            planetDict[d.sy_pnum] += 1;
        }

        if (discoverDict[d.discoverymethod] == undefined) {
            discoverDict[d.discoverymethod] = 1
        } else {
            discoverDict[d.discoverymethod] += 1;
        }
    
    });

    console.log(star_arr);

    for (let i = 0; i < Object.keys(starDict).length; i++) {
        temp = Object();
        temp.star_num = i+1;
        temp.frequency = starDict[i+1];
        star_arr.push(temp);
    }

    console.log(planet_arr);

    for (let i = 0; i < Object.keys(planetDict).length; i++) {
        temp = Object();
        temp.star_num = i+1;
        temp.frequency = planetDict[i+1];
        planet_arr.push(temp);
    }
    

    console.log(discoverDict['Astrometry']);

    
    for (const property in discoverDict) {
        temp = Object();
        temp.star_num = property;
        temp.frequency = discoverDict[property];
        discover_arr.push(temp);
    }

    console.log(discover_arr);


    // Initialize chart and then show it
    barchart = new Barchart({ parentElement: '#barchart'}, star_arr);
    barchart.updateVis();

    barchart1 = new Barchart({ parentElement: '#barchart1'}, planet_arr);
    barchart1.updateVis();

    barchart2 = new Barchart({ parentElement: '#barchart2'}, discover_arr);
    barchart2.updateVis();

    
    
})
.catch(error => {
    console.error(console.error());
});

