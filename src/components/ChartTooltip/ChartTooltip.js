import React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chartTooltipPaper: {
        padding: '1em',
    }
}));

const createStyle = (color) => {
    return {
        color: color,
    };
}

const Tooltip = (props) => {
    const classes = useStyles();

    let { label, payload, showKeys = [], hideKeys = [] } = props;

    return (
        <Paper className={classes.chartTooltipPaper}>
            <div> {label} </div>
            {
                payload.filter( (p) => !hideKeys.find( (hk) => p.dataKey === hk)).map((p) => p.color === "transparent" ? null :
                    <div key={p.dataKey} style={createStyle(p.color)}> {p.name} : {p.payload[p.dataKey]} </div>
                )
            }
            {
                payload.length === 0 ? null :
                    showKeys.map( (k) => <div key={k} style={createStyle('gray')}> {k} : {payload[0].payload[k]} </div> )
            }
        </Paper>
    );
};
Tooltip.propTypes = {

};

export default Tooltip;