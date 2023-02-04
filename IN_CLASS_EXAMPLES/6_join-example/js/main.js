const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

console.log("hello");
let svg = d3.select('#letters')
    .attr('width', 50)
    .attr('height', 500);

updateVis(); 

function updateVis(){
	console.log("update");
	// createLetters1(); //choose one of these
	// createLetters2();
	createLetters3();
}


//VERSION 1: ENTER,APPEND 
//	If called once (static data) it behaves the same as Version 2 
//	If called multiple times (such as, when the user clicks the button)
//		it will not remove the old letters
//		it will append 
function createLetters1(){
	let letters = svg.selectAll("text")
				.data(randomLetters()) 
				.enter()
				.append("text")
				.attr("x", 25)
				.attr("y", (d, i) => i * 20+20)
  				.text(d => d);

}

//VERSION 2: JOIN
//	If called once (static data) it behaves the same as Version 1 
//	If called multiple times (such as, when the user clicks the button)
//		it will display a new set of characters
//			adding ones that are new (enter)
//			updating the ones that are different (update)
//			removing the ones that are no longer there (exit)
function createLetters2(){
	let letters = svg.selectAll("text")
				.data(randomLetters()) 
				.join("text")
				.attr("x", 25)
				.attr("y", (d, i) => i * 20+20)
  				.text(d => d);
}

//VERSION 3: Illustrate enter, update, exit 
function createLetters3(){
	let letters = svg.selectAll("text")
				.data(randomLetters()) 
				.join(
						  function(enter) {
						    return enter
						      .append('text')
						      .style('opacity', 1.0);
						  },
						  function(update) {
						    return update
						      .style('opacity', .5);
						  },
						  function(exit) {
						    return exit.remove();
						  }
					)
				.attr("x", 25)
				.attr("y", (d, i) => i * 20+20)
  				.text(d => d);
}

// let count = 0
// while(true){
// 	console.log(count);
// 	count = count+1;
// 	// await Promises.tick(2500);

// }

  
function randomLetters(){
 	let charsToReturn = '';

 	for(i = 0; i < characters.length; i++){
 		random = Math.random() <= .5;
 		if(random)
 			charsToReturn = charsToReturn+characters[i]; 
 	}

 	console.log(charsToReturn);
 	return charsToReturn; 

 }