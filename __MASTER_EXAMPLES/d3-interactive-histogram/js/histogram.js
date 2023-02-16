class Histogram {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
      // Configuration object with defaults
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 710,
        containerHeight: _config.containerHeight || 200,
        margin: _config.margin || {top: 10, right: 5, bottom: 25, left: 30},
        reverseOrder: _config.reverseOrder || false,
        tooltipPadding: _config.tooltipPadding || 15
      }
      this.data = _data;
      this.initVis();
    }
    
    /**
     * Initialize scales/axes and append static elements, such as axis titles
     */
    initVis() {
      let vis = this;
  
      // Calculate inner chart size. Margin specifies the space around the actual chart.
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      // Define size of SVG drawing area
      vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);


            // X axis: scale and draw:
        vis.x = d3.scaleLinear()
            .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, vis.width]);

        vis.svg.append("g")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(d3.axisBottom(vis.x));

        // set the parameters for the histogram
        vis.histogram = d3.histogram()
        .value(function(d) { return d.price; })   // I need to give the vector of value
        .domain(vis.x.domain())  // then the domain of the graphic
        .thresholds(vis.x.ticks(70)); // then the numbers of bins

        // And apply this function to data to get the bins
        vis.bins = vis.histogram(vis.data);

        // Y axis: scale and draw:
        vis.y = d3.scaleLinear()
        .range([vis.height, 0]);
        vis.y.domain([0, d3.max(vis.bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        vis.svg.append("g")
        .call(d3.axisLeft(vis.y));

        // append the bar rectangles to the svg element
        vis.svg.selectAll("rect")
        .data(vis.bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + vis.x(d.x0) + "," + vis.y(d.length) + ")"; })
            .attr("width", function(d) { return vis.x(d.x1) - vis.x(d.x0) -1 ; })
            .attr("height", function(d) { return vis.height - vis.y(d.length); })
            .style("fill", "#69b3a2")
    }
  
    /**
     * Prepare data and scales before we render it
     */
    updateVis() {
      let vis = this;


     console.log("update vis")

      vis.renderVis();
    }
  
    /**
     * Bind data to visual elements
     */
    renderVis() {
      let vis = this;

      console.log("render vis")
    }
  }
  
  