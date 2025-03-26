import { symbol } from 'd3';

const symbolGenerator = symbol();

export const shapeLegend = (
  selection,
  {
    shapeScale,
    shapeLegendLabel,
    shapeLegendX,
    shapeLegendY,
    tickSpacing = 30,
    tickPadding = 15,
    shapeLegendLabelX = -10,
    shapeLegendLabelY = -24,
  }
) => {
  const shapeLegendG = selection
    .selectAll('g.shape-legend')
    .data([null])
    .join('g')
    .attr('class', 'shape-legend')
    .attr(
      'transform',
      `translate(${shapeLegendX},${shapeLegendY})`
    );

  shapeLegendG
    .selectAll('text.shape-legend-label')
    .data([null])
    .join('text')
    .attr('x', shapeLegendLabelX)
    .attr('y', shapeLegendLabelY)
    .attr('class', 'shape-legend-label')
    .attr('font-family', 'sans-serif')
    .text(shapeLegendLabel);

  shapeLegendG
    .selectAll('g.tick')
    .data(shapeScale.domain())
    .join((enter) =>
      enter
        .append('g')
        .attr('class', 'tick')
        .call((selection) => {
          selection.append('path');
          selection.append('text');
        })
    )
    .attr(
      'transform',
      (d, i) => `translate(0, ${i * tickSpacing})`
    )
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    
    .call((selection) => {
      selection
        .select('path')
        .attr('d', (d) =>
          symbolGenerator
            .type(shapeScale(d))
            .size(200)()
        );
      selection
        .select('text')
        .attr('dy', '0.32em')
        .attr('x', tickPadding)
        .text((d) => d);
    });
};
