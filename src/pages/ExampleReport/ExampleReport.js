import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar } from 'recharts';
import TemplatePage from '../Template/Template';
import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import { getColor, setColors } from './../../Utils/colors';

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

const ExampleReport = (props) => {
    const handleClick = (data, index) => {
        console.log(data);
        console.log(index);
        alert(data.payload.name + ' was clicked');
    }

    setColors({
        uv: '#ff7300',
        amtStroke: '#8884d8',
        amtFill: '#8884d8',
        // pv : '#413ea0'
        pv : 'transparent'
    });

    return (
        <TemplatePage filterDef={exampleFilterDefinition}>
            {data => (
                <React.Fragment>

                    <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                        <Paper style={{ padding: '20px', margin: '10px' }}>
                            <ResponsiveContainer height={500} width={"100%"}>
                                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                        <Paper style={{ width: '75%', padding: '20px', margin: '10px', height: '50%' }}>
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                                <ComposedChart data={data} barCategoryGap={0}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltip showKeys={['date']} hideKeys={['amt']} />} />
                                    <Legend />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area type="monotone" dataKey="amt" fill={getColor('amtFill')} stroke={getColor('amtStroke')} />
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <Bar dataKey="pv" fill={getColor('pv')} onClick={handleClick}/>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                </React.Fragment>
            )}


        </TemplatePage>
    );
}

export default ExampleReport;