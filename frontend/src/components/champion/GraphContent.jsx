import * as d3 from "d3";
import { useLayoutEffect, useEffect, useRef } from "react";

const GraphContent = ({ props }) => {
    const ref = useRef();
    const bodyRef = useRef();
    //const values = [["2024-06-17", 49.22], ["2023-06-17", 44.22], ["2022-06-17", 34.22], ["2021-06-17", 50.22], ["2023-02-17", 50.22]];

    const genPercentGraph = (values) => {
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


            const tooltip = d3.select(bodyRef.current).append("div")
                .attr("id", "tooltip")
                .style("position", "absolute") //Allows positioning within svg
                .style("visibility", "hidden")
                .style("background-color", "black")
                .style("border-radius", "10px")
                .style("border", "2px solid orange")
                .style("padding", "5px")
                .style("font-size", "12px")
                .style("color", "white")
                .style("width", "auto")
                .style("height", "auto")
                .style("text-align", "center")


            // Transform the values to a format that can be used by the scales
            const transformedValues = values.map(d => ({
                x: new Date(d[0]),
                y: d[1] / 100
            }));
            svg.append("path") //append path element
                .datum(transformedValues)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(baseline))); // Access the 'y' property

            svg.selectAll("path")
                .datum(transformedValues)
                .transition().duration(850)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(d.y))); // Access the 'y' property

            svg.selectAll("line")
                .data(values.slice(1)) //Start from the second data point
                .enter()
                .append("line")
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(baseline)) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(baseline)) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            svg.selectAll("line")
                .data(values.slice(1)) //Start from the second data point
                .transition().duration(850)
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(values[i][1] / 100)) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(d[1] / 100)) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            //SCALE THE X AXIS SO THAT 10 TICKS ARE DISPLAYED
            const xAxis = d3.axisBottom(xAxisScale)
            const minDate = d3.min(datesArray);
            const maxDate = d3.max(datesArray);
            const tickValues = []; // Calculate 10 evenly spaced tick values between minDate and maxDate
            const step = (maxDate - minDate) / 9; // 9 steps for 10 ticks
            for (let i = 0; i <= 9; i++) {
                tickValues.push(new Date(minDate.getTime() + i * step));
            }
            xAxis.tickValues(tickValues); // Set the x-axis to use the manually calculated tick values
            xAxis.tickFormat(d3.timeFormat("%b %d")); //format for month, day

            //DISPLAY THE Y AXIS WITH PERCENTAGES
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
                .attr("font-size", width/35 + "px")
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
                .selectAll("text") // Select all y-axis labels
                .attr("font-size", width/35 + "px")
            //.selectAll("text")
            //.attr("font-size", "0.95em")
            //.attr("display", "none");
            svg.selectAll('circle')
            .data(values)
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
            .attr('cy', (d) => yAxisScale(baseline)) //y position
            .attr('r', (d) => width/70); //radius size of each point

        svg.selectAll('circle')
            .data(values)
            .transition().duration(850)
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
            .attr('r', (d) => width/70); //radius size of each point

        svg.selectAll("circle")
            .on("mouseover", function (event, d) {
                // Get the coordinates of the mouse pointer and bounding box proportions
                // const [mouseX, mouseY] = d3.pointer(event, this);
                const relLeft = this.getBoundingClientRect().left - d3.select(bodyRef.current).node().getBoundingClientRect().left
                const relTop = this.getBoundingClientRect().top - d3.select(bodyRef.current).node().getBoundingClientRect().top
                const circleRect = this.getBoundingClientRect()
                const tooltipWidth = tooltip.node().getBoundingClientRect().width;
                const tooltipHeight = tooltip.node().getBoundingClientRect().height;
                const tooltipLeft = relLeft + (circleRect.width / 2) - (tooltipWidth / 2);
                const tooltipTop = relTop - tooltipHeight - 10;

                d3.select(this)
                    .attr("fill", "darkorange")

                // Create or update the tooltip
                d3.select(bodyRef.current).selectAll("#tooltip")
                    .style("left", tooltipLeft + "px")
                    .style("top", tooltipTop + "px")
                    .html(`${d[0].slice(0, 10)}<br>${d[1] + "%"}`)
                    .style("visibility", "visible")
                //.html() allows html tags inside of the tooltip
            })
            .on("mouseout", function () {
                d3.select(this) //change the circle back to normal color
                    .attr("fill", "orange")

                d3.selectAll("#tooltip")
                    .style("visibility", "hidden")
            });

        }, 150)
    }

    const genRankGraph = (values, baseline) => {
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

            //scale used to create visual y-axis representation AND position elements
            const yAxisScale = d3.scaleLinear() //scale for winrate values
                .domain([baseline, 1])
                .range([height - paddingBottom, paddingTop])
            //range([start, end])

            const tooltip = d3.select(bodyRef.current).append("div")
                .attr("id", "tooltip")
                .style("position", "absolute") //Allows positioning within svg
                .style("visibility", "hidden")
                .style("background-color", "black")
                .style("border-radius", "10px")
                .style("border", "2px solid orange")
                .style("padding", "5px")
                .style("font-size", "12px")
                .style("color", "white")
                .style("width", "auto")
                .style("height", "auto")
                .style("text-align", "center")


            // Transform the values to a format that can be used by the scales
            const transformedValues = values.map(d => ({
                x: new Date(d[0]),
                y: d[1]
            }));
            svg.append("path") //append path element
                .datum(transformedValues)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(baseline))); // Access the 'y' property

            svg.selectAll("path")
                .datum(transformedValues)
                .transition().duration(850)
                .attr("fill", "orange")
                .attr("opacity", 0.5)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(d => xAxisScale(d.x)) // Access the 'x' property
                    .y0(d => yAxisScale(baseline)) // Bottom of the area (x-axis)
                    .y1(d => yAxisScale(d.y))); // Access the 'y' property

            svg.selectAll("line")
                .data(values.slice(1)) //Start from the second data point
                .enter()
                .append("line")
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(baseline)) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(baseline)) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            svg.selectAll("line")
                .data(values.slice(1)) //Start from the second data point
                .transition().duration(850)
                .attr("x1", (d, i) => xAxisScale(datesArray[i]))
                .attr("y1", (d, i) => yAxisScale(values[i][1])) //Use past data point
                .attr("x2", (d, i) => xAxisScale(datesArray[i + 1]))
                .attr("y2", (d) => yAxisScale(d[1])) //Use the current data point
                .style("stroke", "orange")
                .style("stroke-width", 3);

            //SCALE THE X AXIS SO THAT 10 TICKS ARE DISPLAYED
            const xAxis = d3.axisBottom(xAxisScale)
            const minDate = d3.min(datesArray);
            const maxDate = d3.max(datesArray);
            const tickValues = []; // Calculate 10 evenly spaced tick values between minDate and maxDate
            const step = (maxDate - minDate) / 9; // 9 steps for 10 ticks
            for (let i = 0; i <= 9; i++) {
                tickValues.push(new Date(minDate.getTime() + i * step));
            }
            xAxis.tickValues(tickValues); // Set the x-axis to use the manually calculated tick values
            xAxis.tickFormat(d3.timeFormat("%b %d")); //format for month, day

            //SCALE THE Y AXIS TO INCREMENT BY 10 RANKS EACH TICK (but start at 1)
            const yAxis = d3.axisLeft(yAxisScale)
            let rankTickArr = [1, 10];
            for (let i = 20; i < baseline - 3; i += 10){   
                rankTickArr.push(i)
            };
            rankTickArr.push(baseline)

            yAxis.tickValues(rankTickArr) // manually set max/min ticks

            svg.append('g')
                .call(xAxis) //draws x axis within g element
                .attr('id', 'x-axis')
                //centers the x axis. translate(x, y)
                //height-padding must be in brackets
                .attr('transform', 'translate(0, ' + (height - paddingBottom) + ')')
                .selectAll("text") // Select all x-axis labels
                .attr("font-size", width/35 + "px")
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
                .selectAll("text") // Select all y-axis labels
                .attr("font-size", width/35 + "px")
            //.selectAll("text")
            //.attr("font-size", "0.95em")
            //.attr("display", "none");

            //apparently gridlines have prio over circles so we gotta move circles even lower
            svg.selectAll('circle')
            .data(values)
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
            .attr('cy', (d) => yAxisScale(baseline)) //y position
            .attr('r', (d) => width/70); //radius size of each point

        svg.selectAll('circle')
            .data(values)
            .transition().duration(850)
            .attr('fill', 'orange')
            .attr('class', 'dataPoint')
            .attr('data-date', (d) => {
                return d[0]
            })
            .attr('data-value', (d) => {
                return d[1]
            })
            .attr('cx', (d, i) => xAxisScale(datesArray[i])) //x position
            .attr('cy', (d) => yAxisScale(d[1])) //y position
            .attr('r', (d) => width/70); //radius size of each point

        svg.selectAll("circle")
            .on("mouseover", function (event, d) {
                // Get the coordinates of the mouse pointer and bounding box proportions
                // const [mouseX, mouseY] = d3.pointer(event, this);
                const relLeft = this.getBoundingClientRect().left - d3.select(bodyRef.current).node().getBoundingClientRect().left
                const relTop = this.getBoundingClientRect().top - d3.select(bodyRef.current).node().getBoundingClientRect().top
                const circleRect = this.getBoundingClientRect()
                const tooltipWidth = tooltip.node().getBoundingClientRect().width;
                const tooltipHeight = tooltip.node().getBoundingClientRect().height;
                const tooltipLeft = relLeft + (circleRect.width / 2) - (tooltipWidth / 2);
                const tooltipTop = relTop - tooltipHeight - 10;

                d3.select(this) //make selected circle dark orange
                    .attr("fill", "darkorange")

                // Create or update the tooltip
                d3.select(bodyRef.current).selectAll("#tooltip")
                    .style("left", tooltipLeft + "px")
                    .style("top", tooltipTop + "px")
                    .html(`${d[0].slice(0, 10)}<br>${"#" + d[1]}`)
                    .style("visibility", "visible")
                //.html() allows html tags inside of the tooltip
            })
            .on("mouseout", function () {
                d3.select(this) //change the circle back to normal color
                .attr("fill", "orange")

                d3.selectAll("#tooltip")
                    .style("visibility", "hidden")
            });

        }, 150)
    }

    useLayoutEffect(() => {
        const values = props.data
        values.sort((a, b) => {
            let dateA = new Date(a[0]); // Parse each date string into a Date object
            let dateB = new Date(b[0]);
            return dateA - dateB; // Compare the dates
        });
        if (props.id === 'RANK') {
            genRankGraph(values.map(d => [d[0], Number(d[1].split('/')[0])]), Math.max(...( values.map(d => ( Math.max(Number(d[1].split('/')[1]), Number(d[1].split('/')[0])) )) )))
        } else {
            genPercentGraph(values)
        }
    }, [props.role, props.data]);

    useEffect(() => {
        d3.select(ref.current).select('svg')
            .transition().duration(650)
            .attr('width', props.dim)
            .attr('height', props.dim)

    }, [props.dim])

    return (

        <div ref={bodyRef} className={`w-full h-full ${props.isClicked ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <svg id={props.id} ref={ref} className='w-full h-full flex justify-center items-center' />
        </div>
    )
}

export default GraphContent