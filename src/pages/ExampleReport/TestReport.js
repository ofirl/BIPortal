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

const TestReport = (props) => {
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
        // pv: 'transparent',
        pvBackground: 'transparent',
    });

    return (
        <TemplatePage {...templateParams} history={props.history}>
            {
                {
                    layout: {
                        columns: '1fr 1fr',
                        rows: '1fr 1fr'
                    },
                    content: [
                        {
                            left: 1,
                            top: 1,
                            height: 1,
                            width: 1,
                            chart: {
                                type: [
                                    // {
                                    //     type: 'line',
                                    //     // object will be passed down directly to the line component
                                    //     props: {
                                    //         lineType: 'monotone',
                                    //         dataKey: 'uv',
                                    //         // stroke: '#ac43fc',
                                    //     }
                                    // },
                                    // {
                                    //     type: 'area',
                                    //     // object will be passed down directly to the line component
                                    //     props: {
                                    //         lineType: 'monotone',
                                    //         dataKey: 'uv',
                                    //         // stroke: '#ac43fc',
                                    //         // fill: '#acacac',
                                    //     }
                                    // },
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            // showZeroes: true,
                                            // showNulls: false,
                                            props: {
                                                dataKey: 'executedPercent',
                                                position: 'inside',
                                            },
                                        },
                                        background: false,
                                        // object will be passed down directly to the line component
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'executedPercent',
                                            // fill: '#cfcfcf',
                                            // onClick: (data, index) => {},
                                            // background: {
                                            //     fill: '#cfcfcf',
                                            // },
                                            // label: true,
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
                                        // object will be passed down directly to the line component
                                        props: {
                                            stackId: 'a',
                                            dataKey: 'unexecutedPercent',
                                            // fill: '#cfcfcf',
                                            // onClick: (data, index) => {},
                                            // label: true,
                                            onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                        },
                                    },
                                ],
                                // layout: 'horizontal',
                                axis: {
                                    // object will be passed directly to the axis component
                                    x: {
                                        dataKey: 'name',
                                    },
                                    y: true,
                                    // object will be passed directly to the axis component
                                    // {
                                    // },
                                },
                                // grid: true,
                                // {
                                //     x: 0,
                                //     y: 0,
                                //     width: 0,
                                //     height: 0,
                                //     horizontal: true,
                                //     vertical: true,
                                //     horizontalPoints: [],
                                //     verticalPoints: []
                                // },
                                // tooltip: true,
                                // tooltip: {
                                //     hideKeys: [],
                                //     showKeys: [],
                                // },
                                // legend: true,
                                legend: {
                                    // height: '1.5em',
                                    // hideKeys: ['executedPercent'],
                                },
                                // props object will be passed down to the chart directly
                                props: {
                                    // general props
                                    // onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                    // onMouseEnter: (e) => { },
                                    // onMouseMove: (e) => { },
                                    // onMouseLeave: (e) => { },
                                    // onMouseDown: (e) => { },
                                    // syncId: "syncCategory",
                                    // margin: {
                                    //     top: 5,
                                    //     bottom: 5,
                                    //     left: 5,
                                    //     right: 5
                                    // },

                                    // bar chart props
                                    // barCategoryGap: '10%',
                                    // barGap: 4,
                                    // barSize: 10,
                                    // maxBarSize: 10,
                                    // stackOffset: 'none',
                                    // reverseStackOrder: 'false',

                                    // area chart props
                                    // baseValue: 'auto',
                                }
                            },
                            // render: (data, setRedirect) =>
                            //     <ResponsiveContainer width={'100%'} height={'99%'}>
                            //         <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            //             <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                            //             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            //             <XAxis dataKey="name" />
                            //             <YAxis />
                            //             <Tooltip />
                            //         </LineChart>
                            //     </ResponsiveContainer>
                        },
                        {
                            left: 2,
                            top: 2,
                            height: 1,
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
                                props: {
                                    // layout: 'vertical',
                                },
                            },
                            // render: (data, setRedirect) =>
                            //     <Paper style={{ width: '100%', height: '100%' }}>
                            //         <ResponsiveContainer height={"99%"} width={"100%"}>
                            //             <ComposedChart layout={'vertical'} data={data} /*barCategoryGap={0}*/>
                            //                 <XAxis type="number" />
                            //                 <YAxis dataKey="name" type="category" />
                            //                 <Tooltip content={<ChartTooltip showKeys={[]} hideKeys={[]} />} />
                            //                 <Legend height={'1.5em'} content={<ChartLegend height={'1.5em'} hideKeys={['pv']} />} />
                            //                 <CartesianGrid stroke="#f5f5f5" />
                            //                 {/* <Area type="monotone" dataKey="amt" fill={getColor('amtFill')} stroke={getColor('amtStroke')} /> */}
                            //                 {/* <Line type="monotone" dataKey="uv" stroke={getColor('uv')} /> */}
                            //                 <Bar stackId="a" dataKey="executedPercent" fill={getColor('pv')} onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })} background={{ fill: getColor('pvBackground') }} >
                            //                     <LabelList dataKey="executedPercent" position="inside" content={({ value }) => value !== 0 ? value + "%" : ''} />
                            //                 </Bar>
                            //                 <Bar stackId="a" dataKey="unexecutedPercent" fill={getColor('uv')} onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })} background={{ fill: getColor('pvBackground') }} >
                            //                     <LabelList dataKey="unexecutedPercent" position="inside" formatter={(v) => v + "%"} /*content={({ value }) => value !== 0 ? value + "%" : ''}*/ />
                            //                 </Bar>
                            //             </ComposedChart>
                            //         </ResponsiveContainer>
                            //     </Paper>
                        }
                    ]
                }
            }
        </TemplatePage>
    );
}

export default TestReport;