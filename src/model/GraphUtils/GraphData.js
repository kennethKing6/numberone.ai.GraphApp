/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
/* eslint-disable indent */

/**
 * This class is used to model the data of the graph.
 * The graph takes an array of objects with each object containing
 * containing an X-coordinate value and a Y-coordinate value
 */
export class GraphData {
    constructor() {
        /**
         * This array contains the list of data objects
         * to be plotted on the graph
         */

        this.graphData = [];
    }

    /**
     * This method is used to determine the origin of the graph
     */
    getGraphOrigin() {
        // eslint-disable-next-line max-len
        if (this.graphData.length > 1) return this.graphData[parseInt(this.graphData.length - 1, 10)];
        return { x: 0, y: 0 };
    }

    /**
     * This method main purpose is to store the bletooth device single reading
     * to an array of graphdata. Remember a graph data contains an X and Y value
     *
     * @param {objectData} objectData is a sigle x and y value to be plotted
     *
     */
      addGraphData(objectData) {
            this.graphData.push(objectData);
      }

      /**
       * This returns an array of all objects containing x and y
       * values to be plotted
       *
       * @return {graphData}
       */
      getData() {
        return this.graphData;
      }

      /**
       * This method is used to initialize the graph. it is very essential
       * as it is needed to for the graph to have an object of X and Y value
       * eventhough we cannot yet read data from the ble bluetooth device
       */
       dataInitializer() {
        // This data is used to initialize the chart when there is no signal yet or no readings
      const dataInitializer = [{ x: 0, y: 0 }];

        if (this.graphData.length === 0) return dataInitializer;
        return this.graphData;
      }
}
