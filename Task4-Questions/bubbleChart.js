
// // set the dimensions and margins of the graph
// const bc_margin = { top: 50, right: 400, bottom: 45, left: 75 },
//   bc_width = 945 - bc_margin.left - bc_margin.right,
//   bc_height = 472 - bc_margin.top - bc_margin.bottom;

// // append the svg object to the body of the page
// const bc_svg = d3
//   .select("#bubble_chart")
//   .append("svg")
//   .attr("width", bc_width + bc_margin.left + bc_margin.right)
//   .attr("height", bc_height + bc_margin.top + bc_margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${bc_margin.left},${bc_margin.top})`);

// // read the data
// d3.csv("data.csv").then((data) => {
//   // add chart title
//   bc_svg
//     .append("text")
//     .attr("x", bc_width / 2)
//     .attr("y", -20)
//     .attr("text-anchor", "middle")
//   .style("font-size", "22px")
//     .text(
//       "Correlation Between Torque, Horsepower, and MPG"
//     );

//   // add x axis
//   const x = d3.scaleLinear().domain([100, 700]).range([0, bc_width]);
//   bc_svg
//     .append("g")
//     .attr("transform", `translate(0, ${bc_height})`)
//     .call(d3.axisBottom(x));

//   // add x axis label
//   bc_svg
//     .append("text")
//     .attr("text-anchor", "middle")
//     .attr("x", bc_width / 2)
//     .attr("y", bc_height + 40)
//     .text("Avg. Horsepower");

//   // add y axis
//   const y = d3.scaleLinear().domain([0, 800]).range([bc_height, 0]);
//   bc_svg.append("g").call(d3.axisLeft(y));

//   // add y axis label:
//   bc_svg
//     .append("text")
//     .attr("text-anchor", "middle")
//     .attr("x", -bc_height / 2)
//     .attr("y", -50)
//     .text("Avg. Torque")
//     .attr("transform", "rotate(-90)");

//   // add a scale for bubble size
//   const z = d3
//     .scaleLinear()
//     .domain([0, d3.max(data, (d) => +d.CO2)])
//     .range([1, 40]);

//   // add a scale for bubble color
//   const makes = Array.from(data, (d) => d.Country);
//   const makeColors = makes.map((el, i, arr) =>
//     d3.interpolateTurbo(i / arr.length)
//                               );
//   const myColor = d3.scaleOrdinal().domain(makes).range(makeColors);

//   // ---------------------------//
//   //      tooltip               //
//   // ---------------------------//

//   // -1- create a tooltip div that is hidden by default:
//   const tooltip = d3
//     .select("#bubble_chart")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "black")
//     .style("border-radius", "5px")
//     .style("padding", "10px")
//     .style("color", "white")
//   .style("font-family", "sans-serif");

//   // -2- create 3 functions to show / update (when mouse moves but stay on same circle) / hide the tooltip
//   const showTooltip = (event, d) => {
//     tooltip.transition().duration(200);
//     tooltip
//       .style("opacity", 1)
//       .html("Make: " + d.Country)
//       .style("left", event.x + 25 + "px")
//       .style("top", event.y + 25 + "px");
//   };
//   const moveTooltip = (event, d) => {
//     tooltip
//       .style("left", event.x + 25 + "px")
//       .style("top", event.y + 25 + "px");
//   };
//   const hideTooltip = (event, d) => {
//     tooltip.transition().duration(200).style("opacity", 0);
//   };

//   // add dots
  
//   bc_svg
//     .append("g")
//     .selectAll("dot")
//     .data(data)
//     .join("circle")
//     .attr("class", "bubbles")
//     .attr("cx", (d) => x(d.GDP))
//     .attr("cy", (d) => y(d.Population))
//     .attr("r", (d) => z(d.CO2))
//     .style("fill", (d) => myColor(d.Country))
//     .attr("stroke", "black")
//     .on("mouseover", showTooltip)
//     .on("mousemove", moveTooltip)
//     .on("mouseleave", hideTooltip);
	
//   // ---------------------------//
//   //       legend              //
//   // ---------------------------//

//   // add legend: circles
//   const valuesToShow = [20, 40];
//   const xCircle = 745;
//   const xLabel = 810;
//   bc_svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .join("circle")
//     .attr("cx", xCircle)
//     .attr("cy", (d) => bc_height - 100 - z(d))
//     .attr("r", (d) => z(d))
//     .style("fill", "none")
//     .attr("stroke", "black"); 

//   // add legend: segments
//   bc_svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .join("line")
//     .attr("x1", (d) => xCircle + z(d))
//     .attr("x2", xLabel)
//     .attr("y1", (d) => bc_height - 100 - z(d))
//     .attr("y2", (d) => bc_height - 100 - z(d))
//     .attr("stroke", "black")
//     .style("stroke-dasharray", "2,2");

//   // add legend: labels
//   bc_svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .join("text")
//     .attr("x", xLabel)
//     .attr("y", (d) => bc_height - 100 - z(d))
//     .text((d) => d)
//     .style("font-size", "14px") 
//     .attr("alignment-baseline", "middle");

//   // legend title
//   bc_svg
//     .append("text")
//     .attr("x", xCircle)
//     .attr("y", bc_height - 100 + 30)
//     .text("Highway MPG")
//     .attr("text-anchor", "middle");

//   // add one dot in the legend for each name
//   const size = 5;
//   const allgroups = makes;
//   bc_svg
//     .selectAll("myrect")
//     .data(allgroups)
//     .join("circle")
//     .attr("cx", 550)
//     .attr("cy", (d, i) => 6 + i * (size + 7))
//     .attr("r", 3)
//     .style("fill", (d) => myColor(d));

//   // add labels beside legend dots
//   bc_svg
//     .selectAll("mylabels")
//     .data(allgroups)
//     .enter()
//     .append("text")
//     .attr("x", 550 + size * 2)
//     .attr("y", (d, i) => 10 + i * (size + 7))
//     .style("fill", (d) => myColor(d))
//     .text((d) => d)
//     .attr("text-anchor", "left")
//     .style("alignment-baseline", "middle")
//   	.style("font-size", "13px");
// });


// Set dimensions
const width = 900;
const height = 550;
const margin = { top: 40, right: 50, bottom: 50, left: 70 };

// Create SVG container
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Load data
d3.csv("data.csv").then(data => {
    // Define scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.GDP) + 5000])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Population) + 100])
        .range([height - margin.bottom, margin.top]);

    const sizeScale = d3.scaleSqrt()
        .domain([d3.min(data, d => d.CO2), d3.max(data, d => d.CO2)])
        .range([5, 50]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw bubbles
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.GDP))
        .attr("cy", d => yScale(d.Population))
        .attr("r", d => sizeScale(d.CO2))
        .attr("fill", d => colorScale(d.Country))
        .attr("opacity", 0.7)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 1);
        })
        .on("mouseout", function (event, d) {
            d3.select(this).attr("opacity", 0.7);
        });

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Axis labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("GDP per Capita (USD)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Population (millions)");

    // Country labels on bubbles
    svg.selectAll("text.country-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("x", d => xScale(d.GDP))
        .attr("y", d => yScale(d.Population))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text(d => d.Country);
});
