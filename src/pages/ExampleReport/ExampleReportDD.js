import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar } from 'recharts';
import TemplatePage from '../Template/Template';
import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import { getColor, setColors } from './../../Utils/colors';
import ChartLegend from '../../components/ChartLegend/ChartLegend';
import ConnectedTable from '../../components/Table/Table';

const exampleData = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400,
      "date": '01/05/2019'
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210,
      "date": '01/06/2019'
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290,
      "date": '01/06/2019'
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000,
      "date": '01/06/2019'
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181,
      "date": '01/06/2019'
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500,
      "date": '01/06/2019'
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100,
      "date": '01/06/2019'
    }
  ];
  

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

const templateParams = {
    filterDef: exampleFilterDefinition,
    service: {
        name: 'testService',
        params: {
            'key1': 'test'
        }
    },
}

const ExampleReportDD = (props) => {
    const handleClick = (data, index) => {
        console.log(data);
        console.log(index);
        alert(index + " : " + data.payload.name + ' was clicked');
    }

    setColors({
        uv: '#ff7300',
        amtStroke: '#8884d8',
        amtFill: '#8884d8',
        pv : '#413ea0',
        // pv: 'transparent',
        pvBackground: 'transparent',
    });

    return (
        <TemplatePage {...templateParams} history={props.history}>
            {(data, setRedirect) => (
                <React.Fragment>
                    <ConnectedTable style={{ height: '500px' }} />

                    {/* <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '50%', width: '100%' }}>
                        <Paper style={{ width: '75%', padding: '20px', margin: '10px', height: '100%' }}>
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid> */}

                    {/* <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                        <Paper style={{ width: '75%', padding: '20px', margin: '10px', height: '50%' }}>
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                                <ComposedChart data={data} barCategoryGap={0}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltip showKeys={['date']} hideKeys={[]} />} />
                                    <Legend content={<ChartLegend hideKeys={['pv']} />} />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area type="monotone" dataKey="amt" fill={getColor('amtFill')} stroke={getColor('amtStroke')} />
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <Bar dataKey="pv" fill={getColor('pv')} onClick={(data, index) => setRedirect('/ExampleReportDD', {test:'tes'})} background={{ fill: getColor('pvBackground') }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid> */}

                    <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                        <Paper style={{ width: '75%', padding: '20px', margin: '10px', height: '50%' }}>
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                                <ComposedChart data={exampleData} barCategoryGap={100} barGap={1}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltip showKeys={[]} hideKeys={[]} />} />
                                    <Legend content={<ChartLegend hideKeys={['pv']} />} />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area type="monotone" dataKey="amt" fill={getColor('amtFill')} stroke={getColor('amtStroke')} />
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <Bar stackId="a" dataKey="pv" fill={getColor('pv')} /*onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })}*/ background={{ fill: getColor('pvBackground') }} >
                                        {/* <LabelList dataKey="executedPercent" position="inisde" content={({ value }) => value + "%"} /> */}
                                    </Bar>
                                    {/* <Bar stackId="a" dataKey="unexecutedPercent" fill={getColor('uv')} onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })} background={{ fill: getColor('pvBackground') }} > */}
                                    {/* <LabelList dataKey="unexecutedPercent" position="inside" content={({ value }) => value + "%"} /> */}
                                    {/* </Bar> */}
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </React.Fragment>
            )}



        </TemplatePage>
    );
}

export default ExampleReportDD;