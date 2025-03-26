import {
  extent,
  scaleLinear,
  scaleOrdinal,
  symbol,
  symbolCross,
  symbolSquare,
  symbolTriangle
} from 'd3';
import { axes } from './axes';
import { shapeLegend } from './shapeLegend';

const symbolGenerator = symbol();

export const scatterPlot = (
  selection,
  {
    data,
    width,
    height,
    xValue,
    yValue,
    shapeValue,
    margin,
    xAxisLabel,
    yAxisLabel,
    shapeLegendLabel,
    shapeLegendX,
    shapeLegendY,
  }
) => {
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top]);

  // Map Gender to specific shapes (Cross for Male, Square for Female)
  const shapeScale = scaleOrdinal()
    .domain(['Male', 'Female']) // Assuming the dataset has these categories
    .range([symbolTriangle, symbolSquare]);

  selection.call(axes, {
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
  });

  selection.call(shapeLegend, {
    shapeScale,
    shapeLegendLabel,
    shapeLegendX,
    shapeLegendY,
  });

  selection
    .selectAll('path.mark')
    .data(data)
    .join('path')
    .attr('class', 'mark')
    .attr('transform', (d) => {
      const x = xScale(xValue(d));
      const y = yScale(yValue(d));
      return `translate(${x},${y})`;
    })
    .attr('d', (d) => {
      const shape = shapeScale(shapeValue(d));
      return symbolGenerator.type(shape).size(200)();
    });
};
