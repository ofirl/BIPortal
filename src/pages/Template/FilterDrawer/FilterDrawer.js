/** 
 * @namespace FilterDrawer
 */

import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
// import Chip from './node_modules/@material-ui/core/Chip';
// import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Select from './node_modules/@material-ui/core/Select';
// import FormControl from './node_modules/@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from './node_modules/@material-ui/core/Input';
// import MenuItem from './node_modules/@material-ui/core/MenuItem';
// import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import DatePicker from "./node_modules/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import TextField from './node_modules/@material-ui/core/TextField';

import FilterListField from './FilterFields/ListField/ListField';
import FilterDateField from './FilterFields/DateField/DateField';
import Tree from '../../../components/Tree/Tree';
import FilterContext from '../../../context/FilterContext';

const useStyles = makeStyles(theme => ({
    drawer: {
        // width: '30%'
    },
    drawerRoot: {
        // height: '100%',
        // width:'30%'
    },
    drawerPaper: {
        // width: '100%',
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

/**
 * Changes {@param oldFilters} by the given new filters and key. <br />
 * Adds or deletes the necessary values/keys from the old filters.
 * 
 * @param {string} key filter key
 * @param {activeFilter} newFilters new active filter (only filters relevant to key {@link key})
 * @param {activeFilter} oldFilters old active filter (all keys)
 * 
 * @memberof FilterDrawer
 */
function onFilterChange(key, newFilters, oldFilters) {
    let allFilterObj = { ...oldFilters };

    if (newFilters.length === 0)
        delete (allFilterObj[key]);
    else
        allFilterObj[key] = newFilters;

    return allFilterObj;
}

/**
 * Filter row component
 * @memberof FilterDrawer
 * 
 * @param {object} props props object
 */
const FilterRow = (props) => {
    const { filter } = props;

    const filterRowStyle = {
        height: 'auto',
        // width: '100%',
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
    data: PropTypes.arrayOf(PropTypes.object),
    /** gets the new selected filters as parameter */
    handleChange: PropTypes.func
}

/**
 * Filter drawer component
 * @memberof FilterDrawer
 * 
 * @param {object} props props object
 */
const FilterDrawer = (props) => {
    let { activeFilter, setFilter } = useContext(FilterContext);

    const { open, filters } = props;
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
                <Grid id="filterGrid" item xs={1} style={{ flexGrow: '1' }} container direction="column" className={classes.maxWidth100}>
                    {
                        Object.keys(filters).map((val) => (
                            <Paper key={val} style={{ marginBottom: '10px' }}>
                                <FilterRow classes={classes} filterKey={val} filter={filters[val]} theme={theme}
                                    handleChange={(newFilters) => setFilter(onFilterChange(val, newFilters, activeFilter))}
                                    value={activeFilter[val] ? activeFilter[val].reduce((prev, curr) => { prev.push(curr.value); return prev; }, []) : null} />
                            </Paper>
                        ))
                    }
                </Grid>
            </Grid>
            {/* </Paper> */}
        </Drawer>
    );
}
FilterDrawer.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool,
    filters: PropTypes.object,
    activeFilters: PropTypes.object,
    onFilterChange: PropTypes.func
}

export default FilterDrawer;