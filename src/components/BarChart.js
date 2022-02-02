import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import getDataSet from '../utils/getData'
import {
    filterData,
    allDataToLowerCase,
    cleanCreditcard,
    cleanCash,
    cleanPin,
    cleanChip,
    cleanEverythingElse,
    countedValues,
    mergeData
} from './transform';
import './BarChart.css'

function BarChart() {
    const d3Chart = useRef()

    useEffect(() => {
        const endpoint = 'https://opendata.rdw.nl/resource/r3rs-ibz5.json'
        let selectedColumn = 'paymentmethod';
        // Vincent heeft mij geholpen met functie x
        function x(areacode) {
            getDataSet(endpoint)
                .then((data) => {
                    if (areacode) { data = data.filter(stad => stad.areamanagerid == areacode) }

                    console.log(data)

                    data = filterData(data, selectedColumn)
                    data = allDataToLowerCase(data)
                    data = cleanCreditcard(data)
                    data = cleanPin(data)
                    data = cleanCash(data)
                    data = cleanChip(data)
                    data = cleanEverythingElse(data)
                    data = countedValues(data)
                    data = mergeData(data)

                    return data

                })

                .then(data => {

                    const svg = d3.select('svg');
                    const tooltip = d3.select('.app').append("div").attr('class', 'toolTip');


                    // Geef een width en een height mee aan de SVG
                    svg
                        .attr('width', 900)
                        .attr('height', 820)

                    // sla de width en height op in een variabelen
                    const width = svg.attr('width');
                    const height = svg.attr('height');

                    // const render = data => {
                    const xValue = d => d.hoeveelheid;
                    const yValue = d => d.betaalmethode;

                    // geef margins mee zodat de chart mooi gecentreerd is
                    const margin = { top: 20, right: 20, bottom: 20, left: 100 };
                    const innerWidth = width - margin.left - margin.right;
                    //console.log(innerWidth)
                    const innerHeight = height - margin.top - margin.bottom;

                    // bepaald de grootte van de x-as en de stappen ertussen
                    const xScale = d3.scaleLinear()

                    // scaleband bepaald de breedte van de bars
                    const yScale = d3.scaleBand()


                    // functie voor de schaalverdeling

                    xScale
                        .domain([0, d3.max(data, xValue)])
                        .range([innerWidth, 0]);

                    yScale
                        .domain(data.map(yValue))
                        .range([innerHeight, 0])
                        .padding(0.2);




                    const g = svg.append('g')
                        .attr('transform',
                            `translate(${margin.left}, ${margin.top})`
                        );

                    // maakt nog een keer nieuwe groep aan met line en text
                    g.append('g').attr('class', 'axis').call((d3.axisLeft(xScale)).ticks(20));
                    g.append('g').attr('class', 'axis').call(d3.axisBottom(yScale))
                        .attr('transform', `translate(0,${innerHeight})`);

                    g.selectAll('rect')
                        .data(data)
                        .enter()
                        .append('rect') // maakt de bars aan
                        .style('fill', "rgb(102, 102, 255)") // geeft een andere kleur aan de bars
                        .attr('y', d => xScale(xValue(d)) - 100)
                        // plaatsing in de grafiek (waar op de y-as)
                        .attr('height', d => innerHeight - xScale(d.hoeveelheid))
                        //   .attr('height', d => yScale(yValue(d))) // width van één bar
                        .attr('width', yScale.bandwidth()) // height van één bar
                        .attr('x', d => { return yScale(d.betaalmethode) })
                        .attr('class', 'bar')
                        .on('mousemove', function (event, d) {
                            tooltip
                                .style('display', 'inline-block')
                                .style('left', event.pageX - 50 + 'px')
                                .style('top', event.pageY - 120 + 'px')
                                .html('<p> hoeveelheid:' + d.hoeveelheid + '</p>')
                        })
                        .on('mouseout', function (d) {
                            console.log('out')
                            tooltip.style('display', 'none')
                        })
                        .transition() // <---- Here is the transition
                        .duration(1000) // 2 seconds
                        .attr('y', d => xScale(xValue(d)))
                        .delay(function (d, i) {
                            return i * - 70
                                ;
                        })
                        .attr('x', d => { return yScale(d.betaalmethode) })
                        .ease(d3.easeExpIn);


                    // https://medium.com/codecakes/handling-radio-buttons-in-d3-js-9c6245c6157
                    function toggleData(selection) {
                        let dataset;
                        d3.selectAll('g').remove()
                        if (selection == 'nederland') {
                            dataset = x('')

                        } else if (selection == 'amsterdam') {
                            dataset = x('363')
                        }
                    }

                    const input = d3.selectAll("input[name='data']")
                        .on('change', function (d) {
                            const selection = this.value;
                            console.log('change to', selection)
                            toggleData(selection)
                        })

                })

        }
        x('')
    }, [])

    // --- BEGIN d3 ---



    return (
        <div className='barChart'>
            <h1>De verschillende betaalmethodes voor parkeren in Nederland</h1>
            <div className="group">
                <input type="radio" id="dataNed" name="data" value="nederland" defaultChecked />
                <label htmlFor="dataNed">Heel Nederland</label>
                <input type="radio" id="dataAms" name="data" value="amsterdam" />
                <label htmlFor="dataNed">Amsterdam</label>

            </div>
            <svg ref={d3Chart}></svg>

        </div>
    )
}

export default BarChart;