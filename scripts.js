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
    const height = 800;
    const width = 1400;
    const padding = 80;
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

    // y-axis
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .attr("id", "y-axis")
      .call(yAxis);

    // x-axis
    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - padding})`)
      .attr("id", "x-axis")
      .call(xAxis);

    // tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .text("a simple tooltip");

    // plotting data
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => barWidth * i + padding)
      .attr("y", d => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", d => height - padding - yScale(d[1]))
      .classed("bar", true)
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .attr("fill", "navy")
      .on("mouseover", d => {
        tooltip
          .style("visibility", "visible")
          .style("top", event.pageY - 30 + "px")
          .style("left", event.pageX + 10 + "px")
          .text(`${d[0]} GDP was $${d[1]}`)
          .attr("data-date", d[0]);
      })
      .on("mouseout", d => tooltip.style("visibility", "hidden"));

    // title
    svg
      .append("text")
      .text("Bar Chart")
      .attr("x", width / 2)
      .attr("y", padding)
      .attr("dy", "-1em")
      .attr("text-anchor", "middle")
      .attr("id", "title")
      .style("font-size", "2em");

    // x-axis label
    svg
      .append("text")
      .text("Year")
      .attr("x", width / 2)
      .attr("y", height - padding)
      .attr("dy", "3em")
      .attr("text-anchor", "middle")
      .attr("id", "x-label")
      .style("font-size", "1.5em");

    // y-axis label
    svg
      .append("text")
      .text("GDP (b)")
      .attr("transform", "rotate(-90)")
      .attr("y", "1em")
      .attr("x", -height / 2)
      .style("font-size", "1.5em");
  }
});
