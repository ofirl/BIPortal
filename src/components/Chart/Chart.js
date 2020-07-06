import React from 'react';
// import PropTypes from 'prop-types';

// import { Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar, LabelList } from 'recharts';

// import Paper from '@material-ui/core/Paper';

// import ChartTooltip from '../../components/ChartTooltip/ChartTooltip';
// import ChartLegend from '../../components/ChartLegend/ChartLegend';

// import { getColor } from './../../Utils/colors';
import { Table } from '../Table/Table';
import ComposedChartBuilder from './components/ComposedChart/ComposedChart';
import PieChartBuilder from './components/PieChart/PieChart';

const mainTypeRenderer = {
    composed: ComposedChartBuilder,
    table: Table,
    pie: PieChartBuilder
};

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

const createChart = (props) => {
    const { title, mainType = "composed", ...others } = props;

    let ChartComp = mainTypeRenderer[mainType];

    return (data) => (
        <ChartContainer title={title}>
            <ChartComp data={data} {...others} />
        </ChartContainer>
    );
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