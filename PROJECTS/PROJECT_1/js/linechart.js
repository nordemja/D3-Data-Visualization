class LineChart {

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
          margin: _config.margin || {
              top: 25,
              right: 50,
              bottom: 50,
              left: 80
          }
      }
      this.data = _data;
      this.x_axis_label = _x_axis_label;
      this.y_axis_label = _y_axis_label;
      this.title = _title
      this.initVis();
  }

  /**
   * Initialize scales/axes and append static chart elements
   */
  initVis() {
      let vis = this;

      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

      vis.xScale = d3.scaleLinear()
          .range([0, vis.width - 10]);

      vis.yScale = d3.scaleLinear()
          .range([vis.height, 0])

      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale)
          .ticks(8)
          .tickSizeOuter(0)
          .tickPadding(10)
          .tickFormat(d => d);

      vis.yAxis = d3.axisLeft(vis.yScale)
          .ticks(8)
          .tickSizeOuter(0)
          .tickPadding(10);

      // Define size of SVG drawing area
      vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);

      // Append group element that will contain our actual chart (see margin convention)
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

      // Append empty x-axis group and move it to the bottom of the chart
      vis.xAxisG = vis.chart.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.height})`);

      // Append y-axis group
      vis.yAxisG = vis.chart.append('g')
          .attr('class', 'axis y-axis');


      // We need to make sure that the tracking area is on top of other chart elements
      vis.marks = vis.chart.append('g');
      vis.trackingArea = vis.chart.append('rect')
          .attr('width', vis.width)
          .attr('height', vis.height)
          .attr('fill', 'none')
          .attr('pointer-events', 'all');

      //(event,d) => {

      // Empty tooltip group (hidden by default)
      vis.tooltip = vis.chart.append('g')
          .attr('class', 'tooltip')
          .style('display', 'none');

      vis.tooltip.append('circle')
          .attr('r', 4);

      vis.tooltip.append('text');

  }


    /**
   * Format Data to year: total format for plotting on line graph
   */
    formatData() {
      let vis = this;

      vis.disc_year_dict = {}
      vis.disc_year_arr = []

      vis.data.forEach(d => {
          if (vis.disc_year_dict[d.disc_year] == undefined) {
              vis.disc_year_dict[d.disc_year] = 1
          } else {
              vis.disc_year_dict[d.disc_year] += 1;
          }

      });

      for (const property in vis.disc_year_dict) {
          temp = Object();
          temp.year = +property;
          temp.count = vis.disc_year_dict[property];
          vis.disc_year_arr.push(temp);
      }

      return vis.disc_year_arr

  }


  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
      let vis = this;
      vis.data = vis.formatData()

      vis.xValue = d => d.year;
      vis.yValue = d => d.count;

      vis.line = d3.line()
          .x(d => vis.xScale(vis.xValue(d)))
          .y(d => vis.yScale(vis.yValue(d)));

      // Set the scale input domains
      vis.xScale.domain(d3.extent(vis.data, vis.xValue)).nice();
      vis.yScale.domain(d3.extent(vis.data, vis.yValue)).nice();

      vis.bisectDate = d3.bisector(vis.xValue).left;

      vis.renderVis();
  }

  /**
   * Bind data to visual elements
   */
  renderVis() {
      let vis = this;

      // Add line path
      vis.marks.selectAll('.chart-line')
          .data([vis.data])
          .join('path')
          .attr('class', 'chart-line')
          .attr('d', vis.line);

      vis.trackingArea
          .on('mouseenter', () => {
              vis.tooltip.style('display', 'block');
          })
          .on('mouseleave', () => {
              vis.tooltip.style('display', 'none');
          })
          .on('mousemove', function(event) {
              // Get date that corresponds to current mouse x-coordinate
              const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
              const date = vis.xScale.invert(xPos);

              // Find nearest data point
              const index = vis.bisectDate(vis.data, date, 1);
              const a = vis.data[index - 1];
              const b = vis.data[index];
              const d = b && (date - a.date > b.date - date) ? b : a;

              // Update tooltip

              vis.tooltip.select('circle')
                  .attr('transform', `translate(${vis.xScale(d.year)},${vis.yScale(d.count)})`);

              vis.tooltip.select('text')
                    .attr('class', 'solar_system')
                  .attr('transform', `translate(${vis.xScale(d.year)},${(vis.yScale(d.count) - 15)})`)
                  .text(d.count + " planets");
          });

      // Update the axes
      vis.xAxisG
      .transition().duration(1000)
      .call(vis.xAxis);


      vis.yAxisG
      .transition().duration(1000).
      call(vis.yAxis);


      // Append both axis titles
      vis.chart.append('text')
          .attr('class', 'axis-title')
          .attr('y', vis.height + vis.config.margin.bottom - 5)
          .attr('x', vis.width / 2)
          .style('text-anchor', 'middle')
          .text(vis.x_axis_label);

      vis.chart.append('text')
          .attr('class', 'axis-title')
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - vis.config.margin.left)
          .attr("x", 0 - (vis.height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(vis.y_axis_label);

      vis.chart.append("text")
          .attr("x", (vis.width / 2))
          .attr("y", 0 - (vis.config.margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text(vis.title);
  }
}