import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';

import Paper from '@material-ui/core/Paper';

import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../components/ChartLegend/ChartLegend';

import { getColor } from './../../Utils/colors';

function formatLabel(value, { prefix, suffix, showZeroes = false, showNulls = false}) {
    if (!showZeroes && value === 0)
        return '';
    if (!showNulls && value == null)
        return '';

    return prefix + value + suffix;
}

const createChart = (props) => {
    const { type, axis: { x: xAxis, y: yAxis }, grid, tooltip = {}, legend = {}, props: chartProps } = props;

    let { showKeys: tooltipShowKeys = [], hideKeys: tooltipHideKeys = [], props: tooltipProps = {} } = tooltip;
    let { hideKeys: legendHideKeys = [], height: legendHeight = '1.5em', props: legendProps = {} } = legend;
    return (data) => (
        <Paper style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer height={"97%"} width={"100%"}>
                <ComposedChart data={data} {...chartProps}>
                    {xAxis ? <XAxis {...xAxis} /> : null}
                    {yAxis ? <YAxis {...yAxis} /> : null}
                    {tooltip ? <Tooltip content={<ChartTooltip showKeys={tooltipShowKeys} hideKeys={tooltipHideKeys} />} {...tooltipProps} /> : null}
                    {legend ? <Legend height={legendHeight} content={<ChartLegend height={legendHeight} hideKeys={legendHideKeys} />} {...legendProps} /> : null}
                    {grid ? <CartesianGrid {...grid} /> : null}
                    {
                        type.map((t) => {
                            let { type, props: {dataKey}, background = true } = t;
                            switch (type) {
                                case 'line':
                                    return <Line stroke={getColor(dataKey)} {...t.props} />;
                                case 'area':
                                    return <Area fill={getColor(dataKey + "Fill")} stroke={getColor(dataKey + "Stroke")} {...t.props} />;
                                case 'bar':
                                    return (
                                        <Bar fill={getColor(dataKey)} background={background ? (background.fill ? { fill: background.fill } : { fill: getColor(dataKey + 'Background') }) : null} {...t.props} >
                                            {t.labelList ? <LabelList {...t.labelList.props} formatter={(v) => formatLabel(v, t.labelList)} /> : null}
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
    );
};
createChart.propTypes = {

};
createChart.defaultProps = {
    type: [],
    grid: true,
    tooltip: true,
    legend: true,
    props: {}
};

export default createChart;