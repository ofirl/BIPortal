import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import ChartTooltip from '../../../../components/ChartTooltip/ChartTooltip';
import ChartLegend from '../../../../components/ChartLegend/ChartLegend';

import { getColor } from './../../../../Utils/colors';
import { Paper } from '@material-ui/core';

const typePresets = {
    pie: {
        outerRadius: 80
    },
    donut: {
        outerRadius: 80,
        innerRadius: 40,
    }
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartBuilder = (props) => {
    const { data, type, axis = {}, grid, tooltip = {}, legend = {}, props: chartProps } = props;

    let { showKeys: tooltipShowKeys = [], hideKeys: tooltipHideKeys = [], props: tooltipProps = {} } = tooltip;
    let { hideKeys: legendHideKeys = [], height: legendHeight = '1.5em', props: legendProps = {} } = legend;

    return (
        <Paper style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer height={"97%"} width={"100%"}>
                <PieChart>
                    {tooltip ? <Tooltip content={<ChartTooltip showKeys={tooltipShowKeys} hideKeys={tooltipHideKeys} />} {...tooltipProps} /> : null}
                    {legend ? <Legend height={legendHeight} content={<ChartLegend height={legendHeight} hideKeys={legendHideKeys} />} {...legendProps} /> : null}
                    {
                        type.map((t, idx) => {
                            let { type: pieType, dataKey, nameKey, props, background = true, labelList = {} } = t;
                            // let { dataKey: labelDataKey, position = "inside", props: labelListProps } = labelList;
                            let preset = typePresets[pieType];

                            if (preset)
                                props = { ...preset, ...props };

                            return (
                                <Pie key={idx} data={data} nameKey={nameKey} dataKey={dataKey} fill={getColor(dataKey)} label {...props} />
                            );
                        })
                    }
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default PieChartBuilder;