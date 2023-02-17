/**
 * Load data from CSV file asynchronously and render bar chart
 */
let histogram;
d3.csv('data/price.csv')
  .then(data => {
    data.forEach(d => {
      d.price = +d.price;
    });

    console.log(data)

    
    // Initialize chart and then show it
    histogram = new Histogram({ parentElement: '#histogram'}, data);
    console.log("CHART IS RENDERED")
  })
  .catch(error => console.error(error));