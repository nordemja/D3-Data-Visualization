let data;
let dataFilter = [];
let data_w_no_blank_radius = [];

let solar_system_arr = [
    {pl_name: "Mercury", label: "Mercury", pl_bmasse: .0553, pl_rade: .192, solar_system: "yes", labelYOffset: 5, labelXOffset: 0},
    {pl_name: "Venus", label: "Venus", pl_bmasse: .815, pl_rade: .475, solar_system: "yes", labelYOffset: -5, labelXOffset: -10},
    {pl_name: "Earth", label: "Earth", pl_bmasse: 1, pl_rade: 1, solar_system: "yes", labelYOffset: 0, labelXOffset: 0},
    {pl_name: "Mars", label: "Mars", pl_bmasse: .107, pl_rade: .267, solar_system: "yes", labelYOffset: 0, labelXOffset: 0},
    {pl_name: "Jupiter", label: "Jupiter", pl_bmasse: 317.8, pl_rade: 5.61, solar_system: "yes", labelYOffset: 0, labelXOffset: 0},
    {pl_name: "Saturn", label: "Saturn", pl_bmasse: 95.2, pl_rade: 4.73, solar_system: "yes", labelYOffset: 10, labelXOffset: 0},
    {pl_name: "Uranus", label: "Uranus", pl_bmasse: 14.5, pl_rade: 2.01, solar_system: "yes", labelYOffset: 10, labelXOffset: 2},
    {pl_name: "Neptune", label: "Neptune", pl_bmasse: 17.1, pl_rade: 1.94, solar_system: "yes", labelYOffset: -5, labelXOffset: -40}
]

d3.csv('data/exoplanets-1.csv')
    .then(_data => {
        console.log('Data loading complete. Work with dataset.');
        console.log(_data);

        let = starDict = {};
        let = star_arr = [];

        let = planetDict = {};
        let = planet_arr = [];

        let star_orbit_dict = {};
        let star_orbit_arr = [];

        let = discoverDict = {};
        let = discover_arr = [];

        let habitable_arr = [];

        let A_dict = {};
        let F_dict = {};
        let G_dict = {};
        let K_dict = {};
        let M_dict = {};

        data  = _data

        data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
            d.st_mass = +d.st_mass;
            d.st_rad = +d.st_rad;
            d.disc_year = +d.disc_year;
            d.pl_bmasse = +d.pl_bmasse;
            d.pl_rade = +d.pl_rade;
            d.sy_dist = +d.sy_dist
            d.sy_snum = +d.sy_snum

            if (d.pl_rade > 0 && d.pl_bmasse > 0) {
                d.solar_system = 'no'
                d.label = '',
                d.labelYOffset = 0, 
                d.labelXOffset = 0,
                data_w_no_blank_radius.push(d)
            }


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


            if (star_orbit_dict[d.st_spectype.charAt(0)] == undefined) {
                star_orbit_dict[d.st_spectype.charAt(0)] = 1
            } else {
                star_orbit_dict[d.st_spectype.charAt(0)] += 1;
            }

            if (discoverDict[d.discoverymethod] == undefined) {
                discoverDict[d.discoverymethod] = 1
            } else {
                discoverDict[d.discoverymethod] += 1;
            }

            star_type = d.st_spectype.charAt(0)
            if (star_type == "A") {

                if (d.pl_orbsmax >= 8.5 && d.pl_orbsmax <= 12.5) {
                    if (A_dict["habitable"] == undefined) {
                        A_dict["habitable"] = 1
                    } else {
                        A_dict["habitable"] += 1;
                    }
                } else {
                    if (A_dict["unhabitable"] == undefined) {
                        A_dict["unhabitable"] = 1
                    } else {
                        A_dict["unhabitable"] += 1;
                    }
                }

            } else if (star_type == "F") {

                if (d.pl_orbsmax >= 1.5 && d.pl_orbsmax <= 2.2) {
                    if (F_dict["habitable"] == undefined) {
                        F_dict["habitable"] = 1
                    } else {
                        F_dict["habitable"] += 1;
                    }
                } else {
                    if (F_dict["unhabitable"] == undefined) {
                        F_dict["unhabitable"] = 1
                    } else {
                        F_dict["unhabitable"] += 1;
                    }
                }

            } else if (star_type == "G") {

                if (d.pl_orbsmax >= .95 && d.pl_orbsmax <= 1.4) {
                    if (G_dict["habitable"] == undefined) {
                        G_dict["habitable"] = 1
                    } else {
                        G_dict["habitable"] += 1;
                    }
                } else {
                    if (G_dict["unhabitable"] == undefined) {
                        G_dict["unhabitable"] = 1
                    } else {
                        G_dict["unhabitable"] += 1;
                    }
                }

            } else if (star_type == "K") {

                if (d.pl_orbsmax >= .38 && d.pl_orbsmax <= .56) {
                    if (K_dict["habitable"] == undefined) {
                        K_dict["habitable"] = 1
                    } else {
                        K_dict["habitable"] += 1;
                    }
                } else {
                    if (K_dict["unhabitable"] == undefined) {
                        K_dict["unhabitable"] = 1
                    } else {
                        K_dict["unhabitable"] += 1;
                    }
                }

            } else if (star_type == "M") {

                if (d.pl_orbsmax >= .08 && d.pl_orbsmax <= .12) {
                    if (M_dict["habitable"] == undefined) {
                        M_dict["habitable"] = 1
                    } else {
                        M_dict["habitable"] += 1;
                    }
                } else {
                    if (M_dict["unhabitable"] == undefined) {
                        M_dict["unhabitable"] = 1
                    } else {
                        M_dict["unhabitable"] += 1;
                    }
                }

            }
        });

        for (let i = 0; i < Object.keys(starDict).length; i++) {
            temp = Object();
            temp.star_num = i + 1;
            temp.frequency = starDict[i + 1];
            star_arr.push(temp);
        }

        for (let i = 0; i < Object.keys(planetDict).length; i++) {
            temp = Object();
            temp.star_num = i + 1;
            temp.frequency = planetDict[i + 1];
            planet_arr.push(temp);
        }

        for (const property in star_orbit_dict) {
            temp = Object();
            if (property == "") {
                temp.star_num = "Unknown"
            } else {
                temp.star_num = property;
            }
            temp.frequency = star_orbit_dict[property];
            if (temp.frequency >= 20) {
                star_orbit_arr.push(temp);
            }
        }



        for (const property in star_orbit_arr) {
            if (star_orbit_arr[property].star_num != "Unknown") {
                temp = Object();
                star_type = star_orbit_arr[property].star_num
                temp.group = star_type
                if (star_type == "A") {
                    temp.habitable = A_dict["habitable"]
                    temp.unhabitable = A_dict["unhabitable"]
                } else if (star_type == "F") {
                    temp.habitable = F_dict["habitable"]
                    temp.unhabitable = F_dict["unhabitable"]
                } else if (star_type == "G") {
                    temp.habitable = G_dict["habitable"]
                    temp.unhabitable = G_dict["unhabitable"]
                } else if (star_type == "K") {
                    temp.habitable = K_dict["habitable"]
                    temp.unhabitable = K_dict["unhabitable"]
                } else if (star_type == "M") {
                    temp.habitable = M_dict["habitable"]
                    temp.unhabitable = M_dict["unhabitable"]
                }


                habitable_arr.push(temp);
            }
        }

        let other_count = 0

        for (const property in discoverDict) {
            temp = Object();
            temp.star_num = property;
            temp.frequency = discoverDict[property];
            if (temp.frequency > 30) {
                discover_arr.push(temp);
            } else {
                other_count += temp.frequency
            }
        }

        let other_object = {
            star_num: "Other",
            frequency: other_count
        }

        discover_arr.push(other_object)



        // Sort data by population
        barchart = new Barchart({
            parentElement: '#barchart'
        }, data, "sy_snum", "Amount of Stars", "Total Number of Planets", "Amount of Stars In Each Exoplanet System");
        barchart.updateVis();

        barchart1 = new Barchart({
            parentElement: '#barchart1'
        }, data, "sy_pnum", "Amount of Planets", "Total Number of Planets", "Amount of Planets In Each Exoplanet System");
        barchart1.updateVis();

        barchart2 = new Barchart({
            parentElement: '#barchart2'
        }, data, "st_spectype", "Star Type", "Total Number of Planets", "Stars Types Exoplanets Orbit");
        barchart2.updateVis();

        barchart3 = new Barchart({
            parentElement: '#barchart3'
        }, data, "discoverymethod", "Dicovery Method", "Total Number of Planets", "Disvoery Methods of Exoplanets");
        barchart3.updateVis();

        DualBarchart = new dual_barchart({
            parentElement: '#dual_barchart'
        }, habitable_arr, ['unhabitable', 'habitable'], "Star Type", "Total Number of Planets", "Habitatle and Unhabitable Exoplanets per Star Type");
        DualBarchart.updateVis();

        histogram = new Histogram({
            parentElement: '#histogram'
        }, data, "Range (Parsecs)", "Total Number of Planets", "Distance of Exoplanets from Earth");
        histogram.updateVis()

        lineChart = new LineChart({
            parentElement: '#linechart'
        }, data, "Discovery Year", "Count", "Discoveries of Exoplanets over Time");
        lineChart.updateVis();

        solar_system_arr.forEach(d => {

            data_w_no_blank_radius.push(d)

        })
        
        scatterplot = new Scatterplot({
            parentElement: '#scatterplot'
        }, data_w_no_blank_radius, "Planet Radius (Earth Radius)", "Planet Mass (Earth Mass)", "Exoplanet Mass vs Radius");
        scatterplot.updateVis();


    })
    
    .catch(error => {
        console.error(console.error());
    });

    function filterData() {
        if(dataFilter.length == 0) {
            scatterplot.data = data_w_no_blank_radius;
            histogram.data = data
            lineChart.data = data
            barchart.data = data
            barchart1.data = data
            barchart2.data = data
            barchart3.data = data
        } else {
            scatterplot.data = data_w_no_blank_radius.filter((d) => dataFilter.includes(d.sy_snum))
            histogram.data = data.filter((d) => dataFilter.includes(d.sy_snum))
            lineChart.data = data.filter((d) => dataFilter.includes(d.sy_snum))
            barchart.data = data.filter((d) => dataFilter.includes(d.sy_snum))
            barchart1.data = data.filter((d) => dataFilter.includes(d.sy_snum))
            barchart2.data = data.filter((d) => dataFilter.includes(d.sy_snum))
            barchart3.data = data.filter((d) => dataFilter.includes(d.sy_snum))
        }
        console.log(dataFilter)
        console.log(barchart2.data)
        histogram.updateVis()
        lineChart.updateVis()
        barchart.updateVis()
        barchart1.updateVis()
        barchart2.updateVis()
        barchart3.updateVis()
        scatterplot.updateVis();
    }
