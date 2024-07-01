import * as d3 from "d3";
import { useLayoutEffect, useRef } from "react";

const GraphContent = ({ props }) => {
    const ref = useRef();
    const values = [["2024-06-17", 49.22], ["2023-06-17", 44.22], ["2022-06-17", 34.22], ["2021-06-17", 50.22], ["2023-02-17", 50.22]];

    useLayoutEffect(() => {
        setTimeout(() => {
            d3.select(ref.current).selectAll('svg').remove();

            const width = props.dim
            const height = props.dim
            const padding = props.dim / 10
            const svg = d3
                .select(ref.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            const xScale = d3
                .scaleLinear()
                .domain([0, values.length - 1])
                .range([padding, width - padding]);

            const datesArray = values.map((d) => {
                return new Date(d[0])
            })

            //each graph should spawn in the top left corner of its respective container element
            //scale used to create visual x-axis representation
            const xAxisScale = d3
                .scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, width - padding]);

            //scale used to create visual y-axis representation AND position elements
            const yAxisScale = d3
                .scaleLinear()
                .domain([0, 100])
                .range([height - padding, padding]);

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

            const xAxis = d3.axisBottom(xAxisScale)
            const yAxis = d3.axisLeft(yAxisScale)

            //Remember svg = d3.select('svg');
            svg.append('g')
                .call(xAxis) //draws x axis within g element
                .attr('id', 'x-axis')
                //centers the x axis. translate(x, y)
                //height-padding must be in brackets
                .attr('transform', 'translate(0, ' + (height - padding) + ')');

            svg.append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('transform', 'translate(' + padding + ', 0)');
        },150)

    });

    return (
        <svg id={props.id} ref={ref} className='w-full h-full'>
            <h2>Test Graph</h2>
        </svg>
    )
}

export default GraphContent