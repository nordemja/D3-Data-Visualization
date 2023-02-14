const parseTime = d3.timeParse("%Y-%m-%d");


d3.csv('data/exoplanets-1.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    let = starDict = {};
    let = star_arr = [];

    let = planetDict = {};
    let = planet_arr = [];

    let star_orbit_dict = {};
    let star_orbit_arr = [];

    let = discoverDict = {};
    let = discover_arr = [];

    let = disc_year_dict = {};
    let = disc_year_arr = [];

    let habitable_dict = {};
    let habitable_arr= [];

    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
        d.st_mass = +d.st_mass;
        d.st_rad = +d.st_rad;
        d.disc_year = +d.disc_year;
    
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


        if (star_orbit_dict[d.st_spectype.charAt(0)] == undefined )  {
            star_orbit_dict[d.st_spectype.charAt(0)] = 1
        } else {
            star_orbit_dict[d.st_spectype.charAt(0)] += 1;
        }

        if (discoverDict[d.discoverymethod] == undefined) {
            discoverDict[d.discoverymethod] = 1
        } else {
            discoverDict[d.discoverymethod] += 1;
        }

        if (disc_year_dict[d.disc_year] == undefined) {
            disc_year_dict[d.disc_year] = 1
        } else {
            disc_year_dict[d.disc_year] += 1;
        }
    });


    for (let i = 0; i < Object.keys(starDict).length; i++) {
        temp = Object();
        temp.star_num = i+1;
        temp.frequency = starDict[i+1];
        star_arr.push(temp);
    }

    for (let i = 0; i < Object.keys(planetDict).length; i++) {
        temp = Object();
        temp.star_num = i+1;
        temp.frequency = planetDict[i+1];
        planet_arr.push(temp);
    }

    for (const property in star_orbit_dict) {
        temp = Object();
        if (property == "") {
            temp.star_num = "Unkown"
        } else {
            temp.star_num = property;
        }
        temp.frequency = star_orbit_dict[property];
        if (temp.frequency >= 20) {
            star_orbit_arr.push(temp);
        }
    }

    console.log(star_orbit_arr);

    
    for (const property in discoverDict) {
        temp = Object();
        temp.star_num = property;
        temp.frequency = discoverDict[property];
        discover_arr.push(temp);
    }

    for (const property in disc_year_dict) {
        temp = Object();
        temp.year = +property;
        temp.count = disc_year_dict[property];
        disc_year_arr.push(temp);
    }

    // Initialize chart and then show it

    // Sort data by population
    star_arr.sort((a,b) => b.frequency - a.frequency);

    barchart = new Barchart({ parentElement: '#barchart'}, star_arr, "x axis", "y axis");
    barchart.updateVis();

    planet_arr.sort((a,b) => b.frequency - a.frequency);
    barchart1 = new Barchart({ parentElement: '#barchart1'}, planet_arr, "x axis", "y axis");
    barchart1.updateVis();

    star_orbit_arr.sort((a,b) => b.frequency - a.frequency);
    barchart2 = new Barchart({ parentElement: '#barchart2'}, star_orbit_arr, "x axis", "y axis");
    barchart2.updateVis();

    discover_arr.sort((a,b) => b.frequency - a.frequency);
    barchart3 = new Barchart({ parentElement: '#barchart3'}, discover_arr, "x axis", "y axis");
    barchart3.updateVis();

    DualBarchart = new dual_barchart({ parentElement: '#dual_barchart'}, star_arr, "x axis", "y axis");
    DualBarchart.updateVis();

    lineChart = new LineChart({ parentElement: '#linechart'}, disc_year_arr);
    lineChart.updateVis();

    
    /*let data_w_no_blank_radius = []

    data.forEach((d, index) => {
        if (d.st_rad != 0) {
            data_w_no_blank_radius.push(data[index])
        }
    }) 

    //console.log(data_w_no_blank_radius);
    scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data_w_no_blank_radius);
    scatterplot.updateVis();*/

    
    
})
.catch(error => {
    console.error(console.error());
});

