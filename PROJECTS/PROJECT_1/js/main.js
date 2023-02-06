d3.csv('data/exoplanets-1.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);


})
.catch(error => {
    console.error('Error loading the data');
});