import * as d3 from "d3";
import { useLayoutEffect, useEffect, useRef } from "react";

const GraphContent = ({ props }) => {
    const ref = useRef();
    //const values = [["2024-06-17", 49.22], ["2023-06-17", 44.22], ["2022-06-17", 34.22], ["2021-06-17", 50.22], ["2023-02-17", 50.22]];

    useLayoutEffect(() => {
        const values = props.data
        values.sort((a, b) => {
            let dateA = new Date(a[0]); // Parse each date string into a Date object
            let dateB = new Date(b[0]);
            return dateA - dateB; // Compare the dates
        });
        setTimeout(() => {
            d3.select(ref.current).selectAll('svg').remove();

            const width = props.dim
            const height = props.dim
            const paddingTop = 3 * props.dim / 40
            const paddingBottom = 5 * props.dim / 40
            const paddingLeft = 5 * props.dim / 40
            const paddingRight = 3 * props.dim / 40

            const svg = d3
                .select(ref.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height])
                .attr('style', "max-width: 100%; height: auto;");

            const datesArray = values.map((d) => {
                return new Date(d[0])
            })

            //each graph should spawn in the top left corner of its respective container element
            //scale used to create visual x-axis representation
            const xAxisScale = d3
                .scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([paddingLeft, width - paddingRight]);

            //declare baseline variable to be used for shading range
            const baseline = d3.min(values, (d) => {
                return d[1] / 100 < 0.1 ? 0 : (d[1] / 100 - 0.1)
            })

            //scale used to create visual y-axis representation AND position elements
            const yAxisScale = d3
                .scaleLinear()
                .domain([baseline, d3.max(values, (d) => {
                    return d[1] / 100 > 0.9 ? 1 : (d[1] / 100 + 0.1)
                })])
                .range([height - paddingBottom, paddingTop])


            // Transform the values to a format that can be used by the scales
            const transformedValues = values.map(d => ({
                x: new Date(d[0]),
                y: d[1] / 100
            }));
            const dummyTransformedValues = values.map(d => ({
                x: new Date(d[0]),
                y: baseline
            }))
            svg.append("path") //append path element
                .datum(dummyTransformedValues)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(d.y))); // Access the 'y' property

            svg.selectAll("path")
                .datum(transformedValues)
                .transition().delay(50).duration(650)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(d.y))); // Access the 'y' property


            const dummyValues = values.map(d => (
                [d[0], baseline]
            ))

            svg.selectAll('circle')
                .data(dummyValues)
                .enter()
                .append('circle')//creates circle elements
                .attr('fill', 'orange')
                .attr('class', 'dataPoint')
                .attr('data-date', (d) => {
                    return d[0]
                })
                .attr('data-value', (d) => {
                    return d[1]
                })
                .attr('cx', (d, i) => xAxisScale(datesArray[i])) //x position
                .attr('cy', (d) => yAxisScale(d[1] / 100)) //y position
                .attr('r', (d) => 5); //radius size of each point

            svg.selectAll('circle')
                .data(values)
                .transition().duration(700)
                .attr('fill', 'orange')
                .attr('class', 'dataPoint')
                .attr('data-date', (d) => {
                    return d[0]
                })
                .attr('data-value', (d) => {
                    return d[1]
                })
                .attr('cx', (d, i) => xAxisScale(datesArray[i])) //x position
                .attr('cy', (d) => yAxisScale(d[1] / 100)) //y position
                .attr('r', (d) => 5); //radius size of each point


            svg.selectAll("line")
                .data(dummyValues.slice(1)) //Start from the second data point
                .enter()
                .append("line")
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(dummyValues[i][1] / 100)) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(d[1] / 100)) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            svg.selectAll("line")
                .data(values.slice(1)) //Start from the second data point
                .transition().duration(700)
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(values[i][1] / 100)) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(d[1] / 100)) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            const xAxis = d3.axisBottom(xAxisScale)
            const yAxis = d3.axisLeft(yAxisScale)
            yAxis.tickFormat(d3.format(".0%")); //display percentages

            //Remember svg = d3.select('svg');
            svg.append('g')
                .call(xAxis) //draws x axis within g element
                .attr('id', 'x-axis')
                //centers the x axis. translate(x, y)
                //height-padding must be in brackets
                .attr('transform', 'translate(0, ' + (height - paddingBottom) + ')')
                .selectAll("text") // Select all x-axis labels
                .attr("transform", "rotate(-30)") // Rotate labels
                .style("text-anchor", "end") // Align labels to the end of the tick
                .attr("dx", "-.8em") // Adjust horizontal position
                .attr("dy", ".15em"); // Adjust vertical position

            svg.append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('transform', 'translate(' + paddingLeft + ', 0)')
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").clone() //For grid lines
                    .attr("x2", width - paddingLeft - paddingRight)
                    .attr("stroke", "orange")
                    .attr("stroke-opacity", 0.5))
            //.selectAll("text")
            //.attr("font-size", "0.95em")
            //.attr("display", "none");

        }, 150)

    }, [/*props.role, */props.data]);

    useEffect(() => {
        d3.select(ref.current).select('svg')
            .transition().duration(650)
            .attr('width', props.dim)
            .attr('height', props.dim)

    }, [props.dim])

    return (
        <svg id={props.id} ref={ref} className='w-full h-full flex justify-center items-center' />
    )
}

export default GraphContent