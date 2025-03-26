import { csvParse, select } from 'd3';
import { scatterPlot } from './scatterPlot';

export const viz = (
  container,
  { state, setState }
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  const { data } = state;

  if (data && data !== 'LOADING') {
    svg.call(scatterPlot, {
      data,
      width,
      height,
      xValue: (d) => d.Weight,  // x-axis is Weight
      yValue: (d) => d.Height,  // y-axis is Height
      shapeValue: (d) => d.Gender,  // Gender determines the shape
      xAxisLabel: 'Weight',
      yAxisLabel: 'Height',
      shapeLegendLabel: 'Gender',
      margin: {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50,
      },
      shapeLegendX: 1550,
      shapeLegendY: 320,
    });
  }

  if (data === undefined) {
    setState((state) => ({
      ...state,
      data: 'LOADING',
    }));
    fetch('https://gist.githubusercontent.com/priya-zha/03cfd7a9919c6bfa05430619402a63a4/raw/e8d95ec24d67642ea21d3094e5840ae23fba5d19/weight.csv')
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString);

        // Parse necessary columns
        for (const d of data) {
          d.Height = +d.Height;  // Convert Height to number
          d.Weight = +d.Weight;  // Convert Weight to number
          d.Gender = d.Gender;   // Gender is kept as string for shape classification
        }

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
