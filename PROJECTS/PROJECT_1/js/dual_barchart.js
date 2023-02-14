class dual_barchart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data, x_axis_label, y_axis_label) {
      // Configuration object with defaults
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 710,
        containerHeight: _config.containerHeight || 200,
        margin: _config.margin || {top: 25, right: 5, bottom: 25, left: 50},
        reverseOrder: _config.reverseOrder || false,
        tooltipPadding: _config.tooltipPadding || 15
      }
      this.data = _data;
      this.x_axis_label = x_axis_label;
      this.y_axis_label = y_axis_label;
      this.initVis();
    }


    initVis() {

    }

    updateVis() {

    }

    renderVis() {

    }

}