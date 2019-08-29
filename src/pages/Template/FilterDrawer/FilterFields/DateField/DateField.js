import React from 'react'
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';

const searchBoxClasses = {
    root: 'hierSearchBox'
}

/**
 * Filter date field component
 * 
 * @param {object} props props object
 */
const FilterDateField = (props) => {
    let { filter, value, handleChange, classes } = props;
    let { dateType = 'range', dateSelection = ['year', 'month', 'day', 'time'] } = filter;

    if (dateType === 'range') {
        let { startDate, endDate } = value ? value[0] : {};

        return (
            <React.Fragment>
                <Grid container spacing={1} >
                    <Grid item xs={1} className={classes.filterDateField}>
                        <DatePicker
                            customInput={<TextField
                                id="outlined-dense"
                                label="התחלה"
                                className={[classes.textField, classes.dense]}
                                classes={searchBoxClasses}
                                margin="dense"
                                variant="outlined"
                            />}
                            dateFormat="dd/MM/yyyy"
                            popperClassName={classes.filterDateFieldPopper}
                            selected={startDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => handleChange([{ operator: 'date-between', value: { startDate: date, endDate: endDate } }])}
                        />
                    </Grid>
                    <Grid item xs={1} className={classes.filterDateField}>
                        <DatePicker
                            customInput={<TextField
                                id="outlined-dense"
                                label="סיום"
                                className={[classes.textField, classes.dense]}
                                classes={searchBoxClasses}
                                margin="dense"
                                variant="outlined"
                            />}
                            dateFormat="dd/MM/yyyy"
                            popperClassName={classes.filterDateFieldPopper}
                            selected={endDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => handleChange([{ operator: 'date-between', value: { startDate: startDate, endDate: date } }])}
                            minDate={startDate}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    if (dateType === 'single') {
        // let { startDate, endDate } = value[0] ? value[0] : {};
        return (
            <DatePicker
                customInput={<TextField
                    id="outlined-dense"
                    label="התחלה"
                    className={[classes.textField, classes.dense]}
                    classes={searchBoxClasses}
                    margin="dense"
                    variant="outlined"
                />}
                dateFormat="dd/MM/yyyy"
                popperClassName={classes.filterDateFieldPopper}
                selected={value ? value[0] : null}
                onChange={(date) => handleChange([{ operator: 'date-single', value: date }])}
            />
        );
    }
}
FilterDateField.propTypes = {
    filter: PropTypes.object,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    classes: PropTypes.object
}

export default FilterDateField;