import React from 'react'
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