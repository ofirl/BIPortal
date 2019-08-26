import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import TopBar from './TopBar/TopBar';
import Box from '@material-ui/core/Box';
import FilterDrawer from './FilterDrawer/FilterDrawer';

import { connect } from 'react-redux';
import { setActiveFilter } from '../../reducers';

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
 * Conversion object for filtering.
 */
const operatorConv = {
  "=": (val1, val2) => val1 === val2,
  ">=": (val1, val2) => val1 >= val2,
  "<=": (val1, val2) => val1 <= val2,
  ">": (val1, val2) => val1 > val2,
  "<": (val1, val2) => val1 < val2,
  "!=": (val1, val2) => val1 !== val2,
  "date-between": (val1, { startDate, endDate }) => { 
    val1 = formatDate(val1);
    return operatorConv[">"](new Date(val1), startDate) && operatorConv["<"](new Date(val1), endDate);
  },
  "date-single": (val1, val2) => {
    val1 = formatDate(val1);
    return operatorConv["="](new Date(val1).getTime(), val2.getTime());
  },
}

/**
 * Converts the given date to a date object
 * 
 * @param {string} date the date to convert (assuming the date is in dd/MM/yyyy format)
 * 
 * @returns {Date} date object
 */
function formatDate(date) {
  // assuming the date is in dd/MM/yyyy format, if not this will need changing
  let match = /(\d{2})\/(\d{2})\/(\d{4})/.exec(date);
  date = new Date(match[3], match[2] - 1, match[1]);
  return date;
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
    // check if the data checks against at least one of the filter values
    return filterObj.some((filterEntry) => operatorConv[filterEntry.operator](data[dataKey], filterEntry.value))
  }

  // check if the data checks against all the filters
  return data.filter((dataVal) => Object.keys(filter).every((filterVal, index, arr) => applyFilter(filterVal, filter[filterVal], dataVal)));
};

/**
 * Changes {@param oldFilters} by the given new filters and key.
 * 
 * Adds or deletes the necessary values/keys from the old filters.
 * 
 * @param {string} key filter key
 * @param {activeFilter} newFilters new active filter (only filters relevant to key {@link key})
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

  let { data, activeFilters, setActiveFilters, filterDef } = props;
  const [open, setOpen] = React.useState(false);

  let filteredData = filterData(activeFilters, data);

  return (
    <React.Fragment>
      <CssBaseline />

      {/* main grid */}
      <Grid container spacing={0} direction="column" className={classes.mainContainer}>

        {/* top bar */}
        <TopBar toggleFilterOpen={() => setOpen(!open)} />

        {/* content grid */}
        <Grid item container xs={1} style={{ flexGrow: '1', maxWidth: '100%', height: '100%', width: '100%' }}>

          {/* filter drawer */}
          <Grid item style={{ flexGrow: open ? 0.3 : 0, maxWidth: '100%', width: '0', transition: 'flex-grow 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }}>
            <FilterDrawer open={open} data={data} filters={filterDef} activeFilters={activeFilters}
              onFilterChange={(key, newFilter) => setActiveFilters(onFilterChange(key, newFilter, activeFilters))} />
          </Grid>

          {/* content */}
          <Grid item xs={1} className={[classes.maxWidth100, classes.content]} container>
            <Box display="flex" style={{ height: '100%', width: '100%' }}>
              {props.children(filteredData)}
            </Box>
          </Grid>

        </Grid>

        {/* <BottomBar /> */}
      </Grid>

    </React.Fragment>
  )
}
Template.propTypes = {
  /** children to render */
  children: PropTypes.func,
  /** filter definition */
  filterDef: PropTypes.object,
  /** data (from store) */
  data: PropTypes.arrayOf(PropTypes.object),
  /** current active fiters (from store) */
  activeFilters: PropTypes.object,
  /** set activ filters (from store) */
  setActiveFilters: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data,
    activeFilters: state.activeFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setActiveFilters: (newActiveFilters) => {
      dispatch(setActiveFilter(newActiveFilters));
    }
  }
}

const ConnectedTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(Template)

export default ConnectedTemplate;