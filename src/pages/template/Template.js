import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar } from 'recharts';
import TopBar from './TopBar';
// import BottomBar from './BottomBar';
import { Box } from '@material-ui/core';
import FilterDrawer from './FilterDrawer';

// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300 }, { name: 'Page C', uv: 250 }, { name: 'Page D', uv: 350 }];

const data2 = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {

  },
  content: {
    flexGrow: '1',
  },
  maxWidth100: {
    maxWidth: '100%'
  },
}));

/**
 * @typedef filterDef
 * @type {Object}
 * @property {{type: string, listType: string, options: Array.<*>}} * The filter definition.
 */
let exampleFilterDefinition = {
  uv: {
    label: 'שם',
    type: 'list',
    listType: 'multi',
    // options: [2000,3000]
  },
  name: {
    label: 'כלי',
    type: 'tree',
  }
};

/**
 * @typedef activeFilter
 * @type {Object}
 * @property {Array.<{operator: '='|'!='|'<'|'>'|'<='|'>=', value}>} * Array of active filters.
 */
let exampleActiveFilter = {
  name: [
    {
      operator: '=',
      value: 'Page A'
    },
    {
      operator: '=',
      value: 'Page B'
    },
    {
      operator: '=',
      value: 'Page C'
    }
  ]
}

/**
 * Conversion object for filtering.
 */
const operatorConv = {
  "=": (val1, val2) => val1 === val2,
  ">=": (val1, val2) => val1 >= val2,
  "<=": (val1, val2) => val1 <= val2,
  ">": (val1, val2) => val1 > val2,
  "<": (val1, val2) => val1 < val2,
  "!=": (val1, val2) => val1 !== val2
}

/**
 * Filter the data based on the given filter.
 * 
 * Filters the data using the filter object given and the convertion object {@link operatorConv}.
 * 
 * @param {activeFilter} filter 
 * @param {Array.<*>} data the data to filter
 * @returns Filtered data
 */
function filterData(filter, data) {
  let applyFilter = function (dataKey, filterObj, data) {
    return filterObj.some((filterEntry) => operatorConv[filterEntry.operator](filterEntry.value, data[dataKey]))
  }

  return data.filter((dataVal) => Object.keys(filter).every((filterVal, index, arr) => applyFilter(filterVal, filter[filterVal], dataVal)));
};

/**
 * Changes {@param oldFilters} by the given new filters and key.
 * 
 * Adds or deletes the necessary values/keys from the old filters.
 * 
 * @param {string} key filter key
 * @param {activeFilter} newFilters new active filter (only filters relevant to key {@link key}
 * @param {activeFilter} oldFilters old active filter (all keys)
 */
function onFilterChange(key, newFilters, oldFilters) {
  let allFilterObj = { ...oldFilters };

  if (newFilters.length === 0)
    delete (allFilterObj[key]);
  else
    allFilterObj[key] = newFilters;

  return allFilterObj;
}

function Template(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState({});

  // let filteredData = filterData(activeFilters, data);
  let filteredData2 = filterData(activeFilters, data2);

  return (
    <React.Fragment>
      <CssBaseline />

      {/* main grid */}
      <Grid container spacing={0} xs direction="column" className={classes.mainContainer}>

        {/* top bar */}
        <TopBar toggleFilterOpen={() => setOpen(!open)} />

        {/* content grid */}
        <Grid item container xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>

          {/* filter drawer */}
          <Grid item xs={open ? 0 : 0} style={{ flexGrow: open ? 0.3 : 0, maxWidth: '100%', width: '0', transition: 'flex-grow 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }}>
            <FilterDrawer open={open} data={data2} filters={exampleFilterDefinition} activeFilters={activeFilters}
              onFilterChange={(key, newFilter) => setActiveFilters(onFilterChange(key, newFilter, activeFilters))} />
          </Grid>

          {/* content */}
          <Grid item xs={1} className={[classes.maxWidth100, classes.content]} container>
            <Box display="flex" style={{ height: '100%', width: '100%' }}>
              {props.children(filteredData2)}
            </Box>
          </Grid>

        </Grid>

        {/* <BottomBar /> */}
      </Grid>

    </React.Fragment>
  )
}

Template.propTypes = {
  children: PropTypes.element
}

export default Template;