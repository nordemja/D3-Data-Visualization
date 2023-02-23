class Scatterplot {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _x_axis_label, _y_axis_label, _title) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 400,
      containerHeight: _config.containerHeight || 190,
      margin: _config.margin || {top: 35., right: 50, bottom: 40, left: 80},
      tooltipPadding: _config.tooltipPadding || 15
    }
    this.data = _data;
    this.x_axis_label = _x_axis_label;
    this.y_axis_label = _y_axis_label;
    this.title = _title;
    this.initVis();
  }
  
  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;


    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales

    vis.xScale = d3.scaleLog()
        .range([0, vis.width]);

    vis.yScale = d3.scaleLog()
        .range([vis.height, 0]);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(6)
        .tickSizeOuter(0)


    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(6)
        .tickSizeOuter(0)

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart 
    // and position it according to the given margin config
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`);
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');

  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;
    
    // Specificy accessor functions
    vis.xValue = d => d.pl_rade;
    vis.yValue = d => d.pl_bmasse;

    // Set the scale input domains
    vis.xScale.domain(d3.extent(vis.data, function(d) { return d.pl_rade; }))
    vis.yScale.domain(d3.extent(vis.data, function(d) { return d.pl_bmasse; }))

    vis.colorScale = d3.scaleOrdinal()
        .range(['#4682B4', '#eb5e34']) // steel blue or red
        .domain(['0','1']);


    vis.renderVis();
  }

  /**
   * Bind data to visual elements.
   */
  renderVis() {
    let vis = this;

    // Add circles
    const circles = vis.chart.selectAll('.point')
        .data(vis.data, d => d.trail)
        .join('circle')
        .attr('class', 'point')
        .attr('r', 4)
        .attr("cx", function(d) {
            return vis.xScale(d.pl_rade);
        })
        .attr("cy", function(d) {
            return vis.yScale(d.pl_bmasse);
        })
        .attr('fill', d => vis.colorScale(d.solar_system));



      vis.chart.selectAll("text")
         .data(vis.data)
         .join("text")
         .attr('class', 'solar_system')
         .text(function(d) {
          return `${d.label}`
         })
         .attr('x', function(d) {
          return d.labelXOffset + vis.xScale(d.pl_rade) 
         })
         .attr('y', function(d) {
          return d.labelYOffset + vis.yScale( d.pl_bmasse)})

    // Tooltip event listeners
    circles
    .on('mouseover', (event,d) => {
      d3.select('#tooltip')
        .style('opacity', 1)
        .style('display', 'block')
        .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
        .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
        .html(`
          <div class="tooltip-title">${d.pl_name}</div>
            <p>${d.pl_rade} ER : ${d.pl_bmasse} EM</p>
        `);
    })
    .on('mouseleave', () => {
      d3.select('#tooltip').style('opacity', 0);
    });
    
    // Update the axes/gridlines
    // We use the second .call() to remove the axis and just show gridlines

    vis.xAxisG
    .call(vis.xAxis)

    vis.yAxisG
        .call(vis.yAxis)

    // Append both axis titles
    vis.chart.append('text')
        .attr('class', 'axis-title')
        .attr('y', vis.height + vis.config.margin.bottom)
        .attr('x', vis.width/2)
        .style('text-anchor', 'middle')
        .text(vis.x_axis_label);

    vis.chart.append('text')
        .attr('class', 'axis-title')
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - vis.config.margin.left)
        .attr("x",0 - (vis.height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(vis.y_axis_label);

      vis.chart.append("text")
        .attr("x", (vis.width / 2))             
        .attr("y", 0 - (vis.config.margin.top / 2) - 5)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(vis.title);
  }
}