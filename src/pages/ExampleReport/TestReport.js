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
    // filterDef: exampleFilterDefinition,
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
                        rows: '1fr 1fr',
                    },
                    filterDef: {
                        // uv: {
                        //     label: 'שם',
                        //     type: 'list',
                        //     addBlank: true,
                        //     listType: 'multi',
                        //     // options: [2000,3000]
                        // },
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
                                mainType: 'table',
                                title: 'title test'
                            }
                        },
                        {
                            left: 1,
                            top: 2,
                            height: 1,
                            width: 1,
                            // texts: {
                            //"id": idTexts
                            // },
                            chart: {
                                mainType: 'pie',
                                type: [
                                    // {
                                    //     type: 'line',
                                    //    // object will be passed down directly to the line component
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
                                        type: 'pie',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            // showZeroes: true,
                                            // showNulls: false,
                                            dataKey: 'executedPercent',
                                            position: 'inside',
                                            props: {
                                                // dataKey: 'executedPercent',
                                                // position: 'inside',
                                            },
                                        },
                                        background: false,
                                        // object will be passed down directly to the line component
                                        dataKey: 'executedPercent',
                                        nameKey: 'name',
                                        props: {
                                            // innerRadius: 0,
                                            outerRadius: 30,
                                            // stackId: 'a',
                                            // dataKey: 'executedPercent',
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
                                        type: 'donut',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            dataKey: 'unexecutedPercent',
                                            position: 'inside',
                                            props: {
                                                // dataKey: 'unexecutedPercent',
                                                // position: 'inside',
                                            },
                                        },
                                        background: false,
                                        // object will be passed down directly to the line component
                                        dataKey: 'unexecutedPercent',
                                        nameKey: 'name',
                                        props: {
                                            // innerRadius: 40,
                                            // outerRadius: 80,
                                            // stackId: 'a',
                                            // dataKey: 'unexecutedPercent',
                                            // fill: '#cfcfcf',
                                            // onClick: (data, index) => {},
                                            // label: true,
                                            onClick: createRedirect(history, '/ExampleReportDD2', ['name']),
                                        },
                                    },
                                ],
                                axis: {
                                    // object will be passed directly to the axis component
                                    y: {
                                        dataKey: 'name',
                                        type: 'category'
                                    },
                                    // object will be passed directly to the axis component
                                    // x: false,
                                    x: {
                                        type: 'number',
                                        hide: true,
                                    },
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
                                tooltip: {
                                    hideKeys: [],
                                    showKeys: ['date'],
                                    // props: {
                                    // }
                                },
                                // legend: true,
                                legend: {
                                    // height: '1.5em',
                                    // hideKeys: ['executedPercent'],
                                    // props: {
                                    // }
                                },
                                // props object will be passed down to the chart directly
                                props: {
                                    // general props
                                    layout: 'vertical',
                                    // onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                    // onMouseEnter: (e) => { },
                                    // onMouseMove: (e) => { },
                                    // onMouseLeave: (e) => { },
                                    // onMouseDown: (e) => { },
                                    syncId: "syncCategory",
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
                                            dataKey: 'executedPercent',
                                            position: 'top',
                                            props: {
                                                // dataKey: 'executedPercent',
                                                // position: 'top',
                                            },
                                        },
                                        background: false,
                                        dataKey: 'executedPercent',
                                        props: {
                                            stackId: 'a',
                                            // dataKey: 'executedPercent',
                                            onClick: createRedirect(history, '/ExampleReportDD', ['name']),
                                        },
                                    },
                                    {
                                        type: 'bar',
                                        labelList: {
                                            suffix: '%',
                                            prefix: '',
                                            dataKey: 'unexecutedPercent',
                                            position: 'top',
                                            props: {
                                                // dataKey: 'unexecutedPercent',
                                                // position: 'top',
                                            },
                                        },
                                        background: false,
                                        dataKey: 'unexecutedPercent',
                                        props: {
                                            stackId: 'a',
                                            // dataKey: 'unexecutedPercent',
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
                                    syncId: "syncCategory",
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