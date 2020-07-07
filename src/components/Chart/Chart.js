/**
 * @namespace ChartContainer
 */

import React, { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';

// import { Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';

// import Paper from '@material-ui/core/Paper';

// import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
// import ChartLegend from '../../components/ChartLegend/ChartLegend';

// import { getColor } from './../../Utils/colors';
import { Table } from '../Table/Table';
import ComposedChartBuilder from './components/ComposedChart/ComposedChart';
import PieChartBuilder from './components/PieChart/PieChart';
import { getChartData, exampleData, getServiceData } from '../../Utils/network';
import FilterContext from '../../context/FilterContext';

const mainTypeRenderer = {
    composed: ComposedChartBuilder,
    table: Table,
    pie: PieChartBuilder
};

/**
 * Converts the given date to a date object
 * 
 * @param {string} date the date to convert (assuming the date is in dd/MM/yyyy format)
 * 
 * @returns {Date} date object
 * 
 * @memberof ChartContainer
 */
function formatDate(date) {
    // assuming the date is in dd/MM/yyyy format, if not this will need changing
    let match = /(\d{2})\/(\d{2})\/(\d{4})/.exec(date);
    date = new Date(match[3], match[2] - 1, match[1]);
    return date;
}

/**
 * Conversion object for filtering <br />
 * Converts a sign to a convertion function
 * 
 * @memberof ChartContainer
 */
const operatorConv = {
    "=": (val1, val2) => val1 === val2,
    ">=": (val1, val2) => val1 >= val2,
    "<=": (val1, val2) => val1 <= val2,
    ">": (val1, val2) => val1 > val2,
    "<": (val1, val2) => val1 < val2,
    "!=": (val1, val2) => val1 !== val2,
    "date-between": (val1, { startDate, endDate }) => {
        val1 = formatDate(val1);
        return operatorConv[">"](new Date(val1), startDate) && operatorConv["<"](new Date(val1), endDate);
    },
    "date-single": (val1, val2) => {
        val1 = formatDate(val1);
        return operatorConv["="](new Date(val1).getTime(), val2.getTime());
    },
}

/**
 * Filter the data based on the given filter. <br/>
 * Filters the data using the filter object given and the convertion object {@link operatorConv}.
 * 
 * @param {activeFilter} filter 
 * @param {Array.<*>} data the data to filter
 * @returns Filtered data
 * 
 * @memberof ChartContainer
 */
function filterData(filter, data) {
    let applyFilter = function (dataKey, filterObj, data) {
        // check if the data checks against at least one of the filter values
        return filterObj.some((filterEntry) => operatorConv[filterEntry.operator](data[dataKey], filterEntry.value))
    }

    // check if the data checks against all the filters
    return data.filter((dataVal) => Object.keys(filter).every((filterVal, index, arr) => applyFilter(filterVal, filter[filterVal], dataVal)));
};

/**
 * Chart container component
 * @memberof ChartContainer
 * 
 * @param {object} props
 */
export const ChartContainer = ({ title, mainType = "composed", onDataFetch, service, ...chartProps }) => {
    let [data, setData] = useState(null);
    let [filteredData, setFilteredData] = useState(null);
    let { activeFilter } = useContext(FilterContext);

    let ChartComp = mainTypeRenderer[mainType];

    // get the data
    useEffect(() => {
        if (data)
            return;

        // getServiceData(service)
            getChartData('https://www.reddit.com/r/reactjs.json')
            .then(
                response => response.json(),
                error => console.log(error)
            )
            .then(jsonData => {
                setData(exampleData);
                onDataFetch(exampleData);
            })
    }, [data, onDataFetch]);

    // filter data
    useEffect(() => {
        if (!data)
            return;

        setFilteredData(filterData(activeFilter, data));
    }, [data, activeFilter]);

    return (
        <div style={{ height: '97%' }}>
            {
                title ? (<div>
                    {title}
                </div>
                ) : null
            }
            <div style={{ height: '97%' }}>
                {
                    data ?
                        <ChartComp data={filteredData} {...chartProps} />
                        : <div> "loading...." </div>
                }
            </div>
        </div>
    );
}

// /**
//  * Creates a chart based on the given props
//  * @param {object} props 
//  */
// const createChart = (props) => {
//     const { title, mainType = "composed", ...others } = props;

//     let ChartComp = mainTypeRenderer[mainType];

//     return (
//         <ChartContainer title={title} chartComp={ChartComp} chartProps={others} />
//     );
// };
// createChart.defaultProps = {
//     type: [],
//     grid: true,
//     tooltip: true,
//     legend: true,
//     props: {},
//     axis: {},
// };

// export default createChart;