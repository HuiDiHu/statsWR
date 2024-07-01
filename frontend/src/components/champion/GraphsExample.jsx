const d3 = require('d3');

let data //purpose?
let values = props.data

let heightScale
let xScale
let xAxisScale
let yAxisScale

let width = 400 //TODO: Will need to find a way to make these scale as the container changes size in the future
let height = 400
let padding = 40

let svg = d3.select('svg')

const drawcanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

//Format of each data point within 2d array: [date, winrate]
//WINRATE – [[date: "2024-06-17T05:32:34.440Z", data: 58.22]]

const generateScales = () => {
    //scale used for positioning elements along the y-axis, AND draws y-axis based on winrate, pickrate, and banrate data
    //each graph should spawn in the top left corner of its respective container element
    
    //scale used to create visual x-axis representation
    xAxisScale = d3.scaleTime() //scale for dates
      .domain([d3.min(datesArray), d3.max(datesArray)])
      .range([padding, width - padding])
  
    //scale used to create visual y-axis representation
    yAxisScale = d3.scaleLinear() //scale for winrate values
      .domain([0, d3.max(values, (d) => {
        return d[1]
      })])
      .range([height - padding, padding])
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
      .attr('class', 'bar')
      .attr('width', (width - (2 * padding)) / values.length)
      .attr('data-date', (d) => {
        return d[0]
      })
      .attr('cx', (d) => xScale(d[0])) //x position
      .attr('cy', (d) => yScale(d[1])) //y position
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
      .attr('transform', 'translate(0, ' + (height-padding) + ')')
  
    svg.append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ', 0)')
  }

drawCanvas(); //functions used to draw line graph 
generateScales();
plotPoints();
generateAxes();

//req.open('GET', url, true)

/* //No request should be needed anymore
req.onload = () => {
  fileData = JSON.parse(req.responseText)
  values = fileData.data //From the fileData object declared 1 line above, access "data" key to get data
  
  drawCanvas() //functions used to draw line graph 
  generateScales()
  drawBars()
  generateAxes()
}
*/

//req.send(); 





/*

<script src="https://d3js.org/d3.v5.min.js"></script> //This code is place into an html file to import D3 allowing for use of built in D3 functions

<script defer src='/GraphsExample.js'></script> //This code is placed into an html file to give GraphsExample.js the ability to generate html elements there

<link href="BarChart.css" rel="stylesheet"> //Placed into the same html file to customize the graph's elements. The axes and points used to create the graphs are html elements 
and can be given ids that css can identify

*/