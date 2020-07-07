import React, { useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import TopBar from './TopBar/TopBar';
import FilterDrawer from './FilterDrawer/FilterDrawer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Grid, Cell } from "styled-css-grid";
import createChart, { ChartContainer } from './../../components/Chart/Chart';
import { Table } from '../../components/Table/Table';
import FilterContext from '../../context/FilterContext';
import DataContext from '../../context/dataContext';

/**
 * @namespace ReportTemplate
 */

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    mainGrid: {
        transition: '225ms cubic-bezier(0, 0, 0.2, 1) 0ms;',
        backgroundColor: '#fafafa',
    },
    filterOpen: {
        gridTemplateColumns: '0.2fr 1fr',
    },
    content: {
        flexGrow: '1',
    },
    maxWidth100: {
        maxWidth: '100%'
    },
}));

/**
 * Redirects to the target with the supplied parameters
 * 
 * @param {object} history history object from react-router
 * @param {string} target redirect target
 * @param {object} params additional url parameters
 * 
 * @memberof ReportTemplate
 */
function onRedirect(history, target, params) {
    let paramString = params ? Object.keys(params).map((p) => `${p}=${params[p]}`).join('&') : '';
    history.push(target + "?" + paramString);
}

function updateReportData(state, action) {
    return { ...state, ...action };
}

function Template(props) {
    console.log('render template');
    const classes = useStyles();
    let [filter, setFilter] = useState({});

    let { children: { title, layout = {}, content = [], filterDef = {} }, history } = props;
    let { columns: layoutColumns = 'auto-fill', rows: layoutRows = 'auto-fill', /*layoutMinWidth = '600px',*/ layoutMinHeight = '200px' } = layout;
    const [open, setOpen] = useState(false);

    let [reportData, dispatch] = useReducer(updateReportData, {});

    let onDataFetch = useCallback((contentId, fetchedData) => {
        dispatch({ [contentId]: fetchedData })
    }, []);

    // if (isFetchingData)
    //     return (
    //         <div>
    //             loading
    //         </div>
    //     );

    return (
        <FilterContext.Provider value={{ activeFilter: filter, setFilter }}>
            <DataContext.Provider value={reportData}>
                <Grid
                    className={[classes.mainGrid, open ? classes.filterOpen : ''].join(' ')}
                    height="100%"
                    columns={"0fr 1fr"}
                    rows={"5em 1fr"}
                    areas={[
                        "header header",
                        "menu   content"
                    ]}>
                    <Cell area="header">
                        <TopBar key="topBar" title={title} toggleFilterOpen={() => setOpen(!open)} />
                    </Cell>
                    <Cell area="menu">
                        <FilterDrawer open={open} filters={filterDef} />
                    </Cell>
                    <Cell area="content" style={{ paddingRight: '10px' }}>
                        <Grid
                            columns={layoutColumns}
                            rows={layoutRows}
                            height="100%"
                            minRowHeight={layoutMinHeight}
                        >
                            {
                                content ?
                                    content.map((c, idx) =>
                                        <Template.GridItem key={idx} {...c} onDataFetch={(fetchedData) => onDataFetch(c.id, fetchedData)} setRedirect={(target, params) => onRedirect(history, target, params)} />)
                                    : null
                            }
                        </Grid>
                    </Cell>
                </Grid>
            </DataContext.Provider>
        </FilterContext.Provider>
    );
};
Template.propTypes = {
    /** children to render */
    children: PropTypes.object.isRequired,
    /** history object from react-router */
    history: PropTypes.object.isRequired,
    /** filter definition */
    filterDef: PropTypes.object,
    /** data (from store) */
    data: PropTypes.arrayOf(PropTypes.object),
    /** current active fiters (from store) */
    activeFilters: PropTypes.object,
    /** set activ filters (from store) */
    setActiveFilters: PropTypes.func,
    /** the service to get the data from */
    serviceName: PropTypes.string
};

Template.GridItem = ({ left, top, width, height, render, data, setRedirect, chart, onDataFetch, ...others }) => {
    let cellProps = {
        left,
        top,
        width,
        height
    };

    return (
        <Cell {...cellProps}>
            {render ? render(chart, setRedirect, onDataFetch) : <ChartContainer onDataFetch={onDataFetch} {...chart} />}
        </Cell>
    );
};

export default Template;