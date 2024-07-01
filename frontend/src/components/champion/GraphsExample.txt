//let values = props.data //2d array containing [dates, values]
let values = [["2024-06-17", 49.22], ["2023-06-17", 44.22], ["2022-06-17", 34.22], ["2021-06-17", 50.22], ["2023-02-17", 50.22]];

let xAxisScale
let yAxisScale

//TODO: Will need to find a way to make these scale as the container changes size in the future
let width = 400 
let height = 400
let padding = 40

//This variable will select the svg element in the html file and generate the graph within it
let svg = d3.select('svg') 

const drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

//Format of each data point within 2d array: [date, winrate]
//WINRATE – [[date: "2024-06-17T05:32:34.440Z", data: 58.22]]

const generateScales = () => {
  //scale used for positioning elements along the x-axis based on date
  xScale = d3.scaleLinear()
    .domain([0, values.length - 1]) //scale range 
    .range([padding, width - padding]) //page range (start, end)
  
  //map function iterates through values which is an array of arrays and returns the first element of each array (we have to do this in order to apply the max/min function to dates I believe) (May have to shave off the extra time stamps using a for loop)
  let datesArray = values.map((d) => {
    return new Date(d[0])
  })

  //each graph should spawn in the top left corner of its respective container element
  //scale used to create visual x-axis representation
  xAxisScale = d3.scaleTime() //scale for dates
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([padding, width - padding])
  
  //scale used to create visual y-axis representation AND position elements
  yAxisScale = d3.scaleLinear() //scale for winrate values
    .domain([0, 100])
    .range([height - padding, padding])
    //.tickFormat((d) => d + '%');
    //range([start, end])
}

let plotPoints = () => {
  /* //not required for now (responsible for hovering effect over circle elements)
  let tooltip = d3.select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('visibility', 'hidden')
  .style('width', 'auto')
  .style('height', 'auto')
  */

  svg.selectAll('circle')
    .data(values)
    .enter()
    .append('circle')//creates circle elements
    .attr('class', 'dataPoint')
    .attr('data-date', (d) => {
      return d[0]
    })
    .attr('data-value', (d) => {
      return d[1]
    })
    .attr('cx', (d, i) => xScale(i)) //x position (positioned using index i since the x axis is scaled using dates)
    .attr('cy', (d) => yAxisScale(d[1])) //y position
    .attr('r', (d) => 5); //radius size of each point

  //not required for now
  /*
  .on('mouseover', (d) => {
    tooltip.transition()
      .style('visibility', 'visible')
      
    tooltip.text(d[0])
      document.querySelector('#tooltip').setAttribute('data-date', d[0])
    })
    
  .on('mouseout', (d) => {
    tooltip.transition()
      .style('visibility', 'hidden')
  }) 
  */
}

let generateAxes = () => {
  let xAxis = d3.axisBottom(xAxisScale)
  let yAxis = d3.axisLeft(yAxisScale)

  //Remember svg = d3.select('svg');
  svg.append('g')
    .call(xAxis) //draws x axis within g element
    .attr('id', 'x-axis')
    //centers the x axis. translate(x, y)
    //height-padding must be in brackets
    .attr('transform', 'translate(0, ' + (height - padding) + ')')

  svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ', 0)')
}

//call the functions to generate the graph
drawCanvas(); 
generateScales();
plotPoints();
generateAxes();




/*

<script src="https://d3js.org/d3.v5.min.js"></script> //This code is placed into an html file to import D3 allowing for the use of built in D3 functions

<script defer src='/GraphsExample.js'></script> //This code is placed into an html file to give GraphsExample.js the ability to generate html elements there

<link href="GraphsExample.css" rel="stylesheet"> //Placed into the same html file to customize the graph's elements. The axes and points used to create the graphs are html elements and can be given ids that css can identify

*/
