import React from 'react';
import PropTypes from 'prop-types';

import { Legend } from 'recharts';

const ChartLegend = (props) => {
    let { height = '1.5em', payload, hideKeys } = props;
    hideKeys.forEach( (k) => {
        let index = payload.findIndex( (p) => p.dataKey === k || p.value === k);
        if (index !== -1)
            payload.splice(index, 1);
    });

    return <Legend wrapperStyle={{ width: '100%', height }} payload={payload} style={{ padding: '0px', margin: '0px', textAlign: 'center' }} />
}
ChartLegend.propTypes = {
    /** height of the legend */
    height: PropTypes.string,
    /** payload (see recharts API) */
    payload: PropTypes.any,
    /** keys to hide on the legend */
    hideKeys: PropTypes.arrayOf(PropTypes.string),
}

export default ChartLegend;