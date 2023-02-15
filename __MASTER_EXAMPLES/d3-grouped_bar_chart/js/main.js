/**
 * Load data from CSV file asynchronously and render bar chart
 */
d3.csv('data/data.csv')
  .then(data => {
    // Convert sales strings to numbers
    data.forEach(d => {;
      d.Nitrogen = +d.Nitrogen
      d.Normal = +d.Normal
      d.Stress = +d.Stress
    });

    console.log(data);
    
    // Initialize chart
    const DualBarchart = new dual_barchart({ parentElement: '#dual_barchart1'}, data, 'x axis', 'y axis');
    console.log("CONTINUE")

    //DualBarchart.updateVis();

    console.log("CHART IS RENDERED!");
    
    // Show chart
    //barchart.updateVis();
  })
  .catch(error => console.error(error));