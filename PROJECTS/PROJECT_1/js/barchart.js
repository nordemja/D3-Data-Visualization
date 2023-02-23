class Barchart {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _x_axis_label, _y_axis_label, _title) {
    // Configuration object with defaults
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 425,
      containerHeight: _config.containerHeight || 410,
      margin: _config.margin || {top: 50, right: 50, bottom: 85, left: 80},
      reverseOrder: _config.reverseOrder || false,
      tooltipPadding: _config.tooltipPadding || 15
    }
    this.data = _data;
    this.x_axis_label = _x_axis_label;
    this.y_axis_label = _y_axis_label;
    this.title = _title;
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

    // Initialize scales and axes
    // Important: we flip array elements in the y output range to position the rectangles correctly
    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]) 

    vis.xScale = d3.scaleBand()
        .range([0, vis.width])
        .paddingInner(0.2);

    vis.xAxis = d3.axisBottom(vis.xScale)
        .tickSizeOuter(0);

    vis.yAxis = d3.axisLeft(vis.yScale)
      .tickSizeOuter(0)
      .ticks(6)

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // SVG Group containing the actual chart; D3 margin convention
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
   * Prepare data and scales before we render it
   */
  updateVis() {
    let vis = this;

    // Reverse column order depending on user selection
    if (vis.config.reverseOrder) {
      vis.data.reverse();
    }

    // Specificy x- and y-accessor functions
    vis.xValue = d => d.star_num;
    vis.yValue = d => d.frequency;

    // Set the scale input domains
    vis.xScale.domain(vis.data.map(vis.xValue));
    vis.yScale.domain([0, d3.max(vis.data, vis.yValue)]).nice();

    vis.renderVis();
  }

  /**
   * Bind data to visual elements
   */
  renderVis() {
    let vis = this;

    // Add rectangles
    let bars = vis.chart.selectAll('.bar')
        .data(vis.data, vis.xValue)
      .join('rect');

    bars.style('opacity', 0.5)
      .transition().duration(1000)
        .style('opacity', 1)
        .attr('class', 'bar') 
        .attr('x', d => vis.xScale(vis.xValue(d)))
        .attr('width', vis.xScale.bandwidth())
        .attr('height', d => vis.height - vis.yScale(vis.yValue(d)))
        .attr('y', d => vis.yScale(vis.yValue(d)));

    bars
      .on('click', function(event, d) {
        const isActive = dataFilter.includes(d.star_num);
        if (isActive) {
          dataFilter = dataFilter.filter((f) => f !== d.star_num);
        } else {
          dataFilter.push(d.star_num);
        }
        filterData()
      })

    
    // Tooltip event listeners
    bars
        .on('mouseover', (event,d) => {
          d3.select('#tooltip')
            .style('opacity', 1)
            // Format number with million and thousand separator
            .html(`<div class="tooltip-label">Amount of Planets</div>${d3.format(',')(d.frequency)}`)
        })
        .on('mousemove', (event) => {
          d3.select('#tooltip')
            .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
            .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
        })
        .on('mouseleave', () => {
          d3.select('#tooltip').style('opacity', 0);
        });

        

    // Update axes
    vis.xAxisG
        .transition().duration(1000)
        .call(vis.xAxis)
          .selectAll('text')
            .style("text-anchor", "start")
            .attr('transform',"rotate(25)")

    vis.yAxisG.call(vis.yAxis);3

    // Append both axis titles
    vis.chart.append('text')
    .attr('class', 'axis-title')
    .attr('y', vis.height + vis.config.margin.bottom - 5)
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
      .attr("y", 0 - (vis.config.margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .style("text-decoration", "bold")  
      .text(vis.title);

    
  }
}

