import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';

import Paper from '@material-ui/core/Paper';

import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../components/ChartLegend/ChartLegend';

import { getColor } from './../../Utils/colors';
import { Table } from '../Table/Table';

const ChartContainer = ({ title, children }) => {
    return (
        <div style={{ height: '97%' }}>
            {
                title ? (<div>
                    {title}
                </div>
                ) : null
            }
            <div style={{ height: '97%' }}>
                {children}
            </div>
        </div>
    );
}

function formatLabel(value, { prefix, suffix, showZeroes = false, showNulls = false }) {
    if (!showZeroes && value === 0)
        return '';
    if (!showNulls && value == null)
        return '';

    return prefix + value + suffix;
}

const createChart = (props) => {
    const { title, type, axis = {}, grid, tooltip = {}, legend = {}, props: chartProps } = props;

    let { x: xAxis, y: yAxis } = axis;
    let { showKeys: tooltipShowKeys = [], hideKeys: tooltipHideKeys = [], props: tooltipProps = {} } = tooltip;
    let { hideKeys: legendHideKeys = [], height: legendHeight = '1.5em', props: legendProps = {} } = legend;

    if (type.type === "table")
        return (data) => <ChartContainer title={title}> <Table data={data} /> </ChartContainer>
    else
        return (data) => (
            <ChartContainer title={title}>
                <Paper style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer height={"97%"} width={"100%"}>
                        <ComposedChart data={data} {...chartProps}>
                            {xAxis ? <XAxis {...xAxis} /> : null}
                            {yAxis ? <YAxis {...yAxis} /> : null}
                            {tooltip ? <Tooltip content={<ChartTooltip showKeys={tooltipShowKeys} hideKeys={tooltipHideKeys} />} {...tooltipProps} /> : null}
                            {legend ? <Legend height={legendHeight} content={<ChartLegend height={legendHeight} hideKeys={legendHideKeys} />} {...legendProps} /> : null}
                            {grid ? <CartesianGrid {...grid} /> : null}
                            {
                                type.map((t, idx) => {
                                    let { type, dataKey, props, background = true, labelList = {} } = t;
                                    let { dataKey: labelDataKey, position = "inside", props: labelListProps } = labelList;
                                    switch (type) {
                                        case 'line':
                                            return <Line key={idx} dataKey={dataKey} stroke={getColor(dataKey)} {...props} />;
                                        case 'area':
                                            return <Area key={idx} dataKey={dataKey} fill={getColor(dataKey + "Fill")} stroke={getColor(dataKey + "Stroke")} {...props} />;
                                        case 'bar':
                                            return (
                                                <Bar key={idx} dataKey={dataKey} fill={getColor(dataKey)} background={background ? (background.fill ? { fill: background.fill } : { fill: getColor(dataKey + 'Background') }) : null} {...props} >
                                                    {labelList ? <LabelList dataKey={labelDataKey} position={position} {...labelListProps} formatter={(v) => v > 60 ? '!' : formatLabel(v, labelList)} content={(data) => (<g> test </g>)} /> : null}
                                                </Bar>
                                            );
                                        default:
                                            return null;
                                    }
                                })
                            }
                        </ComposedChart>
                    </ResponsiveContainer>
                </Paper>
            </ChartContainer>
        );
};
createChart.propTypes = {

};
createChart.defaultProps = {
    type: [],
    grid: true,
    tooltip: true,
    legend: true,
    props: {},
    axis: {},
};

export default createChart;