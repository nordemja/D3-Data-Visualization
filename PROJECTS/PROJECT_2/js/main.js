


d3.tsv('data/sampleData.tsv')
.then(data => {

    console.log(data.length);
    data.forEach(d => {
      d.latitude = +d.LATITUDE; //make sure these are not strings
      d.longitude = +d.LONGITUDE; //make sure these are not strings
    });

    console.log(data)
    // Initialize chart and then show it
    leafletMap = new LeafletMap({ parentElement: '#my-map'}, data);


  })
  .catch(error => console.error(error));
