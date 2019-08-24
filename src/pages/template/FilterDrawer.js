import React from 'react'
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
// import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
// import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';

import Tree from './Tree';

const useStyles = makeStyles(theme => ({
    drawer: {
        // width: '30%'
    },
    drawerRoot: {
        height: '100%',
        // width:'30%'
    },
    drawerPaper: {
        width: '100%',
        position: 'relative',
        backgroundColor: '#fafafa',
        borderRight: 'none',
        padding: '10px',
        overflow: 'visible'
    },
    maxWidth100: {
        maxWidth: '100%'
    },
    formControl: {
        width: '100%'
    },
    filterChip: {
        margin: '1px',
        //   width: '50%',
        direction: 'ltr'
    },
    filterInputLine: {
        flexGrow: '1',
        width: '100%',
        maxHeight: '3em',
        alignItems: 'center'
    },
    filterInputLineLabel: {
        flexGrow: '1',
        width: '100%'
    },
    filterInputLineField: {
        flexGrow: '1',
        width: '100%'
    },
    filterDateField: {
        flexGrow: '1',
        maxWidth: '100%'
    },
    filterDateFieldPopper: {
        zIndex: '1001'
    }
}));

const searchBoxClasses = {
    root: 'hierSearchBox'
}

/**
 * This function will infer the filter value from the data
 * @param {Array.<*>} data The data to infer from
 */
function inferOptions(data, key) {
    if (data.length === 0)
        return {};

    let filters = {};
    if (key == null)
        Object.keys(data[0]).forEach((value) => filters[value] = new Set());
    else
        filters[key] = new Set();

    Object.keys(filters).forEach((value) => {
        let allVals = data.reduce((prev, curr) => prev.add(curr[value]), new Set());
        filters[value] = allVals;
    });

    Object.keys(filters).forEach((f) => filters[f] = [...filters[f]]);
    return filters;
}

/**
 * Filter list field component
 * 
 * @param {object} props props object
 */
const FilterListField = (props) => {
    const { classes, filterKey, filter, value, theme, data, handleChange, MenuProps } = props;

    function getStyles(name, value, theme) {
        return {
            fontWeight:
                value != null && value.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <FormControl className={classes.formControl}>
            {/* <InputLabel htmlFor="select-multiple-chip"> {filter.label} </InputLabel> */}
            <Select
                multiple
                // autoWidth
                value={value ? value : []}
                onChange={(e) => { handleChange(e.target.value.map((v) => { return { operator: '=', value: v } })) }}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {selected.map(value => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {(filter.options ? filter.options : (inferOptions(data, filterKey)[filterKey])).map(option => (
                    <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
FilterListField.propTypes = {
    classes: PropTypes.object,
    filterKey: PropTypes.string,
    filter: PropTypes.object,
    value: PropTypes.any,
    theme: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
    handleChange: PropTypes.func,
    MenuProps: PropTypes.object
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
                <Grid container xs spacing={1} >
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

/**
 * Filter row component
 * 
 * @param {object} props props object
 */
const FilterRow = (props) => {
    const { filter } = props;

    const filterRowStyle = {
        height: 'auto',
        width: '100%',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        paddingLeft: '8px',
        paddingRight: '8px'
    }
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: '20em',
                // width: 200,
            },
        },
    };

    let filterField = null;

    if (filter.type === "list")
        filterField = <FilterListField {...props} menuProps={MenuProps} />;
    if (filter.type === "tree")
        filterField = <Tree {...props} />;
    if (filter.type === 'date') {
        filterField = <FilterDateField {...props} />;
    }

    return (
        <div style={filterRowStyle}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}> {filter.label} </Typography>
            {filterField}
        </div>
    );
}
FilterRow.propTypes = {
    classes: PropTypes.object,
    /** filter key */
    filterKey: PropTypes.string,
    /** filter definition object */
    filter: PropTypes.object,
    /** active value */
    value: PropTypes.any,
    theme: PropTypes.object,
    data: PropTypes.object,
    /** gets the new selected filters as parameter */
    handleChange: PropTypes.func
}

/**
 * Filter drawer component
 * 
 * @param {object} props props object
 */
const FilterDrawer = (props) => {
    const { data, open, filters, activeFilters, onFilterChange } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
                root: classes.drawerRoot
            }}
        >
            {/* <Paper> */}
            <Grid container direction="column" style={{ height: '100%', direction: 'rtl' }}>
                {/* <div style={{ height: '5em' }}></div> */}
                <Grid id="filterGrid" item xs={1} style={{ flexGrow: '1' }} container direction="column" className={classes.maxWidth100}>
                    {/* <Grid item xs={1} style={{ flexGrow: '1' }} className={classes.maxWidth100} direction="column">
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            מסננים זמינים
                        </Typography>
                        <Draggable bounds="#filterGrid">
                            <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} onClick={() => alert('click')} onDelete={() => alert('delete')} />
                        </Draggable>
                        <br />
                        <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} />
                        <br />
                        <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} />
                    </Grid>
                    <Divider className={classes.maxWidth100} />
                    <Grid item xs={1} style={{ flexGrow: '1' }} className={classes.maxWidth100}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            מסננים אקטיבים
                        </Typography>
                    </Grid> */}
                    {
                        Object.keys(filters).map((val) => (
                            <Paper style={{ marginBottom: '10px' }}>
                                <FilterRow classes={classes} filterKey={val} filter={filters[val]} theme={theme} data={data}
                                    handleChange={(newFilters) => onFilterChange(val, newFilters)}
                                    value={activeFilters[val] ? activeFilters[val].reduce((prev, curr) => { prev.push(curr.value); return prev; }, []) : null} />
                            </Paper>
                        )
                        )
                    }
                </Grid>
                {/* <div style={{ height: '5em' }}></div> */}
            </Grid>
            {/* </Paper> */}
        </Drawer>
    );
}
FilterDrawer.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    filters: PropTypes.object, 
    activeFilters: PropTypes.object, 
    onFilterChange: PropTypes.func
}

export default FilterDrawer;