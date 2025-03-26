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
      xValue: (d) => d.sepal_length,
      yValue: (d) => d.petal_length,
      shapeValue: (d) => d.species,
      xAxisLabel: 'Sepal Length',
      yAxisLabel: 'Petal Length',
      shapeLegendLabel: 'Species',
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
    fetch('https://gist.githubusercontent.com/priya-zha/3dc3aa9a47007d7611c0e32d6a93ee3d/raw/32dc00c22df5f1d665c6b63181089d5eade9765f/iris.csv')
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString);

        for (const d of data) {
          d.petal_length = +d.petal_length;
          d.petal_width = +d.petal_width;
          d.sepal_length = +d.sepal_length;
          d.sepal_width = +d.sepal_width;
        }

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
