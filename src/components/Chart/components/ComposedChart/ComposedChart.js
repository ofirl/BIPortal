import React from 'react';

import { Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';

import Paper from '@material-ui/core/Paper';

import ChartTooltip from '../../../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../../../components/ChartLegend/ChartLegend';

import { getColor } from './../../../../Utils/colors';

function formatLabel(value, { prefix = "", suffix = "", showZeroes = false, showNulls = false }) {
    if (!showZeroes && value === 0)
        return '';
    if (!showNulls && value == null)
        return '';

    return prefix + value + suffix;
}

const ComposedChartBuilder = (props) => {
    const { data, type, axis = {}, grid, tooltip = {}, legend = {}, props: chartProps } = props;

    let { x: xAxis, y: yAxis } = axis;
    let { showKeys: tooltipShowKeys = [], hideKeys: tooltipHideKeys = [], props: tooltipProps = {} } = tooltip;
    let { hideKeys: legendHideKeys = [], height: legendHeight = '1.5em', props: legendProps = {} } = legend;

    return (
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
                            let { dataKey: labelDataKey = dataKey, position = "inside", props: labelListProps } = labelList;
                            switch (type) {
                                case 'line':
                                    return <Line key={idx} dataKey={dataKey} stroke={getColor(dataKey)} {...props} />;
                                case 'area':
                                    return <Area key={idx} dataKey={dataKey} fill={getColor(dataKey + "Fill")} stroke={getColor(dataKey + "Stroke")} {...props} />;
                                case 'bar':
                                    return (
                                        <Bar key={idx} dataKey={dataKey} fill={getColor(dataKey)} background={background ? (background.fill ? { fill: background.fill } : { fill: getColor(dataKey + 'Background') }) : null} {...props} >
                                            {labelList ? <LabelList dataKey={labelDataKey} position={position} {...labelListProps} formatter={(v) => formatLabel(v, labelList)} /> : null}
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
}

export default ComposedChartBuilder;