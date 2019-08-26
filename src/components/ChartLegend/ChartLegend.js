import React from 'react';
// import PropTypes from 'prop-types';

import { Legend } from 'recharts';

const ChartLegend = (props) => {
    let { payload, hideKeys } = props;
    
    hideKeys.forEach( (k) => {
        let index = payload.findIndex( (p) => p.dataKey === k);
        if (index !== -1)
            payload.splice(index, 1);
    });

    return <Legend wrapperStyle={{ width: '100%', height: '100%' }} payload={payload} style={{ padding: '0px', margin: '0px', textAlign: 'center' }} />
}

export default ChartLegend;