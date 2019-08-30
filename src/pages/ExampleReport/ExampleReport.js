import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';
import TemplatePage from '../Template/Template';
import { getColor, setColors } from './../../Utils/colors';
import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../components/ChartLegend/ChartLegend';

import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';

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

function getPercentMockData(executedPercent) {
    return {
        executedPercent: executedPercent,
        unexecutedPercent: 100 - executedPercent,
    };
}

let lockshData = [
    {
        name: 'אח"י חנית',
        ...getPercentMockData(30)
    },
    {
        name: 'אח"י סופה',
        ...getPercentMockData(0)
    }
];

const templateParams = {
    filterDef: exampleFilterDefinition,
    service: {
        name: 'testService',
        params: {
            'key1': 'test'
        }
    },
}

const GridItemWidth = WidthProvider(TemplatePage.GridItem);

const ExampleReport = (props) => {
    const handleClick = (data, index) => {
        console.log(data);
        console.log(index);
        alert(index + " : " + data.payload.name + ' was clicked');
    }

    setColors({
        // uv: '#ff7300',
        uv: '#bd050d',
        amtStroke: '#8884d8',
        amtFill: '#8884d8',
        // pv: '#413ea0',
        pv: '#2baa00',
        // pv: 'transparent',
        pvBackground: 'transparent',
    });

    return (
        <TemplatePage {...templateParams} history={props.history}>
            {(data, setRedirect) => [
                // <React.Fragment>

                    
                    <GridItemWidth key="b">
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                            {/* { ({width, height, ...others}) => */}
                                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey="uv" stroke={getColor('uv')} />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            {/* } */}
                            </ResponsiveContainer>
                    </GridItemWidth>
                    ,
                    
                    <TemplatePage.GridItem key="c">
                            <ResponsiveContainer height={"100%"} width={"100%"}>
                                <ComposedChart data={data} /*barCategoryGap={0}*/>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltip showKeys={[]} hideKeys={[]} />} />
                                    <Legend content={<ChartLegend hideKeys={['pv']} />} />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    {/* <Area type="monotone" dataKey="amt" fill={getColor('amtFill')} stroke={getColor('amtStroke')} /> */}
                                    {/* <Line type="monotone" dataKey="uv" stroke={getColor('uv')} /> */}
                                    <Bar stackId="a" dataKey="executedPercent" fill={getColor('pv')} onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })} background={{ fill: getColor('pvBackground') }} >
                                        <LabelList dataKey="executedPercent" position="inside" content={({ value }) => value !== 0 ? value + "%" : ''} />
                                    </Bar>
                                    <Bar stackId="a" dataKey="unexecutedPercent" fill={getColor('uv')} onClick={(data, index) => setRedirect('/ExampleReportDD', { index: index })} background={{ fill: getColor('pvBackground') }} >
                                        <LabelList dataKey="unexecutedPercent" position="inside" content={({ value }) => value !== 0 ? value + "%" : ''} />
                                    </Bar>
                                </ComposedChart>
                            </ResponsiveContainer>
                    </TemplatePage.GridItem>

                //  </React.Fragment>
            ]
            }


        </TemplatePage>
    );
}

export default ExampleReport;