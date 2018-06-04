document.addEventListener("DOMContentLoaded", () => {
  setup();
  function setup() {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then(res => res.json())
      .then(myJson => barChart(myJson.data));
  }

  function barChart(data) {
    const height = 600;
    const width = 1400;
    const padding = 40;
    const barPadding = 1;
    const barCount = data.length;
    const barWidth = (width - padding * 2) / barCount;

    const svg = d3
      .select("#svg")
      .attr("height", height)
      .attr("width", width);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d[0])))
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([height - padding, padding]);

    const yAxis = d3.axisLeft(yScale);

    console.log(xScale(new Date("2001, 01, 01")));

    svg
      .append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .attr("id", "y-axis")
      .call(yAxis);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(d[0]))
      .attr("y", d => height - padding - yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", d => yScale(d[1]))
      .attr("fill", "navy");

    svg
      .append("text")
      .text("Bar Chart")
      .attr("x", width / 2)
      .attr("y", padding)
      // .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("id", "title")
      .style("font-size", "2em");
  }
});
