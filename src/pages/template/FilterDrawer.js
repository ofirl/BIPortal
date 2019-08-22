import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

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
    },
    maxWidth100: {
        maxWidth: '100%'
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
    }
}));

/**
 * This function will infer the filter value from the data
 * @param {*[]} data 
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

    return filters;
}

function getStyles(name, value, theme) {
    return {
        fontWeight:
            value!= null && value.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FilterRow = (props) => {
    const { classes, filter, value, theme, options, handleChange } = props;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: '20em',
                // width: 200,
            },
        },
    };
    
    if (filter.type === "list") {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">כלי</InputLabel>
                <Select
                    multiple
                    // autoWidth
                    value={value}
                    onChange={(e) => {handleChange(e.target.value.map( (v) => { return {operator: '=', value: v}}))}}
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
                    {options.map(option => (
                        <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
    return (
        <Grid item container className={classes.filterInputLine}>
            <Grid item xs={6} className={classes.filterInputLineLabel}>
                test1
            </Grid>
            <Grid item xs={6} className={classes.filterInputLineField}>
                test2
            </Grid>
        </Grid>
    );
}

export default (props) => {
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
                        Object.keys(filters).map((val) => <FilterRow classes={classes} filter={filters[val]} theme={theme} options={[...(inferOptions(data, val)[val])]}
                            handleChange={(newFilters) => onFilterChange(val, newFilters)}
                            value={activeFilters[val] ? activeFilters[val].reduce((prev, curr) => { prev.push(curr.value); return prev; }, []) : []} />)
                    }
                </Grid>
                {/* <div style={{ height: '5em' }}></div> */}
            </Grid>
        </Drawer>
    );
}