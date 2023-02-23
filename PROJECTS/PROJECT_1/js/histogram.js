class Histogram {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data, _x_axis_label, _y_axis_label, _title) {
        // Configuration object with defaults
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 450,
            containerHeight: _config.containerHeight || 200,
            margin: _config.margin ||  {top: 25, right: 50, bottom: 55, left: 80},
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

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0])


        vis.xScale = d3.scaleLinear()
            .range([0, vis.width])

        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickSizeOuter(0)

        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickSizeOuter(0)
            .ticks(6)

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)

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

        vis.xScale.domain([0, 2400]).nice()
        
        // set the parameters for the histogram
        vis.histogram = d3.histogram()
            .value(function(d) {
                return d.sy_dist;
            }) // I need to give the vector of value
            .domain(vis.xScale.domain()) // then the domain of the graphic
            .thresholds(vis.xScale.ticks(10)); // then the numbers of bins

        // And apply this function to data to get the bins
        vis.bins = vis.histogram(vis.data);

        vis.yScale.domain([0, d3.max(vis.bins, function(d) {
            return d.length;
        })]).nice();



        vis.renderVis();
    }

    /**
     * Bind data to visual elements
     */
    renderVis() {
        let vis = this;

        // append the bar rectangles to the svg element
        let bars = vis.chart.selectAll("rect")
            .data(vis.bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) {
                return "translate(" + vis.xScale(d.x0) + "," + vis.yScale(d.length) + ")";
            })
            .attr("width", function(d) {
                return vis.xScale(d.x1) - vis.xScale(d.x0) - 1;
            })
            .attr("height", function(d) {
                return vis.height - vis.yScale(d.length);
            })
            .style("fill", "#69b3a2")


        // Tooltip event listeners
        bars
            .on('mouseover', (event, d) => {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    // Format number with million and thousand separator
                    .html(`<div class="tooltip-label">Range</div>${d.x0 + " - " + d.x1 + ' miles'} `);
            })
            .on('mousemove', (event) => {
                d3.select('#tooltip')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
            })
            .on('mouseleave', () => {
                d3.select('#tooltip').style('opacity', 0);
            })

        vis.xAxisG
            .call(vis.xAxis)
            .selectAll('text')
            .style("text-anchor", "start")
            .attr('transform', "rotate(35)")

        vis.yAxisG
            .call(vis.yAxis);

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