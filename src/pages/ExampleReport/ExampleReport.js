import React from 'react';

// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';
import TemplatePage from '../Template/Template';
import { getColor, setColors } from './../../Utils/colors';
import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../components/ChartLegend/ChartLegend';
import { createRedirect } from '../../Utils/charts';

// import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';

/**
 * @typedef filterDefEntry
 * @type {object} 
 * @property {string} type the type of the filter, supported values are: 'list', 'date'
 * @property {string} [listType] the type of the list, suported values are: 'single', 'multi', default is 'single'
 * @property {Array.<*>} [options] the options of the list
 * @property {bool} [addBlank] add a blank option, default is false
 * @property {string} dateType the type of the date, supported values are: 'single', 'range' (default is range)
 * @property {string | Array.<string>} dateSelection the type of the selection, supported values are: 'year', 'month', 'day', 'time'
 */
/**
 * @typedef filterDef
 * @type {Object}
 * @property {filterDefEntry} * The filter definition.
 */
let exampleFilterDefinition = {
    uv: {
        label: 'שם',
        type: 'list',
        addBlank: true,
        listType: 'multi',
        // options: [2000,3000]
    },
    name: {
        label: 'כלי',
        type: 'tree',
    },
    date: {
        label: 'תאריך',
        type: 'date',
        // dateType: 'single'
    }
};

// function getPercentMockData(executedPercent) {
//     return {
//         executedPercent: executedPercent,
//         unexecutedPercent: 100 - executedPercent,
//     };
// }

// let lockshData = [
//     {
//         name: 'אח"י חנית',
//         ...getPercentMockData(30)
//     },
//     {
//         name: 'אח"י סופה',
//         ...getPercentMockData(0)
//     }
// ];

const templateParams = {
    filterDef: exampleFilterDefinition,
    service: {
        name: 'testService',
        params: {
            'key1': 'test'
        }
    },
}

const ExampleReport = (props) => {
    let { history } = props;
    // const handleClick = (data, index) => {
    //     console.log(data);
    //     console.log(index);
    //     alert(index + " : " + data.payload.name + ' was clicked');
    // }

    setColors({
        // uv: '#ff7300',
        uv: '#bd050d',
        amtStroke: '#8884d8',
        amtFill: '#8884d8',
        // pv: '#413ea0',
        pv: '#2baa00',
        // executedPercentBackground: '#2baa00',
        executedPercent: '#2baa00',
        // unexecutedPercentBackground: '#bd050d',
        unexecutedPercent: '#bd050d',
        unexecutedPercentFill: '#bd050d',
        // pv: 'transparent',
        pvBackground: 'transparent',
    });

    return (
        <TemplatePage {...templateParams} history={props.history}>
            {
                {
                    filterDef: {
                        uv: {
                            label: 'שם',
                            type: 'list',
                            addBlank: true,
                            listType: 'multi',
                            // options: [2000,3000]
                        },
                        name: {
                            label: 'כלי',
                            type: 'tree',
                        },
                        date: {
                            label: 'תאריך',
                            type: 'date',
                            // dateType: 'single'
                        }
                    },
                    content: [
                        {
                            left: 1,
                            top: 1,
                            height: 1,
                            width: 1,
                            chart: {
                                type: [
                                    {
                                        type: 'area',
                                        props: {
                                            lineType: 'monotone',
                                            dataKey: 'unexecutedPercent',
                                        }
                                    },
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            props: {
                                                dataKey: 'executedPercent',
                                                position: 'inside',
                                            },
                                        },
                                        background: false,
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'executedPercent',
                                            onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                        },
                                    },
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            props: {
                                                dataKey: 'unexecutedPercent',
                                                position: 'inside',
                                            },
                                        },
                                        background: false,
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'unexecutedPercent',
                                            onClick: createRedirect(history, '/ExampleReportDD2', ['name']),
                                        },
                                    },
                                    {
                                        type: 'line',
                                        props: {
                                            lineType: 'monotone',
                                            dataKey: 'executedPercent',
                                        }
                                    },
                                ],
                                axis: {
                                    y: {
                                        dataKey: 'name',
                                        type: 'category'
                                    },
                                    x: {
                                        type: 'number',
                                        hide: true,
                                    },
                                },
                                legend: true,
                                props: {
                                    layout: 'vertical',
                                }
                            },
                        },
                        {
                            left: 2,
                            top: 1,
                            height: 2,
                            width: 1,
                            chart: {
                                type: [
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            props: {
                                                dataKey: 'executedPercent',
                                                position: 'inside',
                                            },
                                        },
                                        background: false,
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'executedPercent',
                                            onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                        },
                                    },
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            props: {
                                                dataKey: 'unexecutedPercent',
                                                position: 'inside',
                                            },
                                        },
                                        background: false,
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'unexecutedPercent',
                                            onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                        },
                                    },
                                ],
                                axis: {
                                    y: {
                                        type: 'number',
                                    },
                                    x: {
                                        dataKey: 'name',
                                        type: 'category',
                                    },
                                },
                            },
                        }
                    ]
                }
            }
        </TemplatePage>
    );
}

export default ExampleReport;