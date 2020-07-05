import React from 'react';

import { connect } from 'react-redux';
import { setActiveFilter } from '../../reducers';

import ReactTable from "react-table";
import "react-table/react-table.css";

import { average, sum } from './../../Utils/math';

// for testing table
const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: 'test' + Math.random(), //namor.generate({ words: 1, numbers: 0 }),
        lastName: 'last' + Math.random(), //namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}

export const Table = (props) => {
    const { data, ...tableProps } = props;

    return (
        <ReactTable
            data={makeData()}
            // data={data}
            columns={[
                {
                    Header: "Name",
                    columns: [
                        {
                            Header: "First Name",
                            accessor: "firstName",
                            PivotValue: ({ value }) =>
                                <span style={{ color: "darkred" }}>
                                    {value}
                                </span>
                        },
                        {
                            Header: "Last Name",
                            id: "lastName",
                            accessor: d => d.lastName,
                            PivotValue: ({ value }) =>
                                <span style={{ color: "darkblue" }}>
                                    {value}
                                </span>,
                            Footer: () =>
                                <div style={{ textAlign: "center" }}>
                                    <strong>Pivot Column Footer</strong>
                                </div>
                        }
                    ]
                },
                {
                    Header: "Info",
                    columns: [
                        {
                            Header: "Age",
                            accessor: "age",
                            aggregate: vals => {
                                return Math.round(average(vals));
                            },
                            Aggregated: row =>
                                <span>
                                    {row.value} (avg)
                                </span>
                        },
                        {
                            Header: "Visits",
                            accessor: "visits",
                            aggregate: vals => sum(vals),
                            filterable: false
                        }
                    ]
                },
                {
                    pivot: true,
                    Header: () =>
                        <strong>Overridden Pivot Column Header Group</strong>
                },
                {
                    expander: true
                }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
            pivotBy={["firstName", "lastName"]}
            defaultSorted={[
                { id: "firstName", desc: false },
                { id: "lastName", desc: true }
            ]}
            collapseOnSortingChange={false}
            filterable
            ExpanderComponent={({ isExpanded, ...rest }) =>
                isExpanded ? <span> &#10136; </span> : <span> &#10137; </span>}
            SubComponent={row => {
                return (
                    <div style={{ padding: "20px" }}>
                        <em>
                            You can put any component you want here, even another React
                            Table!
                        </em>
                        <br />
                        <br />
                        <ReactTable
                            data={makeData()}
                            columns={[
                                {
                                    Header: "Name",
                                    columns: [
                                        {
                                            Header: "First Name",
                                            accessor: "firstName"
                                        },
                                        {
                                            Header: "Last Name",
                                            id: "lastName",
                                            accessor: d => d.lastName,
                                        }
                                    ]
                                },
                                {
                                    Header: "Info",
                                    columns: [
                                        {
                                            Header: "Age",
                                            accessor: "age"
                                        },
                                        {
                                            Header: "Visits",
                                            accessor: "visits"
                                        }
                                    ]
                                }
                            ]}
                            defaultPageSize={3}
                            showPagination={false}
                            SubComponent={row => {
                                return (
                                    <div style={{ padding: "20px" }}>Sub Component!</div>
                                );
                            }}
                        />
                    </div>
                );
            }}
        />
    );
};

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

const ConnectedTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export const createTable = (props) => {
    return (
        <Table>
            
        </Table>
    );
}

export default ConnectedTable;