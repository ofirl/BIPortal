import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Legend, Area, Bar } from 'recharts';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Box } from '@material-ui/core';
import FilterDrawer from './FilterDrawer';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300 }, { name: 'Page C', uv: 250 }, { name: 'Page D', uv: 350 }];

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
    // flexShrink: '1',
  },
  maxWidth100: {
    maxWidth: '100%'
  },
}));

let exampleFilterDefinition = {
  name: {
    type: 'list',
    listType: 'single'
  },
  // name2: {
  //   type: 'list',
  //   listType: 'single'
  // },
  // name3: {
  //   type: 'list',
  //   listType: 'single'
  // }
};

let exampleActiveFilter = {
  name: [{
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

const operatorConv = {
  "=": (val1, val2) => val1 === val2,
  ">=": (val1, val2) => val1 >= val2,
  "<=": (val1, val2) => val1 <= val2,
  ">": (val1, val2) => val1 > val2,
  "<": (val1, val2) => val1 < val2,
  "!=": (val1, val2) => val1 !== val2
}

function filterData(filter, data) {
  let applyFilter = function (dataKey, filterObj, data) {
    return filterObj.some((filterEntry) => operatorConv[filterEntry.operator](filterEntry.value, data[dataKey]))
  }

  return data.filter((dataVal) => Object.keys(filter).every((filterVal, index, arr) => applyFilter(filterVal, filter[filterVal], dataVal)));
};

function onFilterChange(key, newFilters, oldFilters) {
  let allFilterObj = { ...oldFilters };

  if (newFilters.length === 0)
    delete (allFilterObj[key]);
  else
    allFilterObj[key] = newFilters;

  return allFilterObj;
}

export default (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState({});

  let filteredData = filterData(activeFilters, data);
  let filteredData2 = filterData(activeFilters, data2);

  return (
    <React.Fragment>
      <CssBaseline />

      <Grid container spacing={0} xs direction="column" className={classes.mainContainer}>
        <TopBar toggleFilterOpen={() => setOpen(!open)} />
        <Grid item container xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
          <Grid item xs={open ? 0 : 0} style={{flexGrow: open ? 0.3 : 0, maxWidth: '100%', transition: open ? 'flex-grow 225ms cubic-bezier(0, 0, 0.2, 1) 0ms': '' }}>
            <FilterDrawer open={open} data={data} filters={exampleFilterDefinition} activeFilters={activeFilters}
              onFilterChange={(key, newFilter) => setActiveFilters(onFilterChange(key, newFilter, activeFilters))} />
          </Grid>
          <Grid item xs={1} className={[classes.maxWidth100, classes.content]} container>
            {/* <Grid item xs={1} style={{ flexGrow: '1', height:'100%', maxWidth:'100%' }}> */}
            <Box display="flex" style={{ height: '100%', width: '100%' }}>
              <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                <Paper style={{ padding: '20px', margin: '10px' }}>
                  <ResponsiveContainer height={500} width={"100%"}>
                    <LineChart data={filteredData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>
                <Paper style={{ width: '50%', padding: '20px', margin: '10px', height: '50%' }}>
                  <ResponsiveContainer height={"100%"} width={"100%"}>
                    <ComposedChart data={filteredData2}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid stroke="#f5f5f5" />
                      <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                      <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Box>
            {/* </Grid> */}
            {/* <Grid item xs={1} style={{ flexGrow: '0.5', maxWidth: '100%' }}>
            <FilterDrawer open={open} data={data} filters={exampleFilterDefinition} activeFilters={activeFilters}
              onFilterChange={(key, newFilter) => setActiveFilters(onFilterChange(key, newFilter, activeFilters))} />
          </Grid> */}

          </Grid>
        </Grid>

        {/* <BottomBar /> */}
      </Grid>

      {/* <FilterDrawer open={open} data={data} filters={exampleFilterDefinition} activeFilters={activeFilters}
        onFilterChange={(key, newFilter) => setActiveFilters(onFilterChange(key, newFilter, activeFilters))} /> */}

    </React.Fragment>
  )
}