import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

import ReactTable from "react-table";
import "react-table/react-table.css";

// import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

import { average, sum } from './../../Utils/math';
import EnhancedTableToolbar from './components/TableToolbar/TableToolbar';
import EnhancedTableHead from './components/TableHead/TableHead';

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

export function makeData(len = 553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}

// export const TableOld = (props) => {
//     const { data, ...tableProps } = props;

//     const mockData = useMemo(() => {
//         return makeData();
//     }, [])

//     return (
//         <ReactTable
//             data={mockData}
//             // data={data}
//             columns={[
//                 {
//                     Header: "Name",
//                     columns: [
//                         {
//                             Header: "First Name",
//                             accessor: "firstName",
//                             PivotValue: ({ value }) =>
//                                 <span style={{ color: "darkred" }}>
//                                     {value}
//                                 </span>
//                         },
//                         {
//                             Header: "Last Name",
//                             id: "lastName",
//                             accessor: d => d.lastName,
//                             PivotValue: ({ value }) =>
//                                 <span style={{ color: "darkblue" }}>
//                                     {value}
//                                 </span>,
//                             Footer: () =>
//                                 <div style={{ textAlign: "center" }}>
//                                     <strong>Pivot Column Footer</strong>
//                                 </div>
//                         }
//                     ]
//                 },
//                 {
//                     Header: "Info",
//                     columns: [
//                         {
//                             Header: "Age",
//                             accessor: "age",
//                             aggregate: vals => {
//                                 return Math.round(average(vals));
//                             },
//                             Aggregated: row =>
//                                 <span>
//                                     {row.value} (avg)
//                                 </span>
//                         },
//                         {
//                             Header: "Visits",
//                             accessor: "visits",
//                             aggregate: vals => sum(vals),
//                             filterable: false
//                         }
//                     ]
//                 },
//                 {
//                     pivot: true,
//                     Header: () =>
//                         <strong>Overridden Pivot Column Header Group</strong>
//                 },
//                 {
//                     expander: true
//                 }
//             ]}
//             defaultPageSize={5}
//             className="-striped -highlight"
//             pivotBy={["firstName", "lastName"]}
//             defaultSorted={[
//                 { id: "firstName", desc: false },
//                 { id: "lastName", desc: true }
//             ]}
//             collapseOnSortingChange={false}
//             filterable
//             ExpanderComponent={({ isExpanded, ...rest }) =>
//                 isExpanded ? <span> &#10136; </span> : <span> &#10137; </span>}
//             SubComponent={row => {
//                 return (
//                     <div style={{ padding: "20px" }}>
//                         <em>
//                             You can put any component you want here, even another React
//                             Table!
//                         </em>
//                         <br />
//                         <br />
//                         <ReactTable
//                             data={makeData()}
//                             columns={[
//                                 {
//                                     Header: "Name",
//                                     columns: [
//                                         {
//                                             Header: "First Name",
//                                             accessor: "firstName"
//                                         },
//                                         {
//                                             Header: "Last Name",
//                                             id: "lastName",
//                                             accessor: d => d.lastName,
//                                         }
//                                     ]
//                                 },
//                                 {
//                                     Header: "Info",
//                                     columns: [
//                                         {
//                                             Header: "Age",
//                                             accessor: "age"
//                                         },
//                                         {
//                                             Header: "Visits",
//                                             accessor: "visits"
//                                         }
//                                     ]
//                                 }
//                             ]}
//                             defaultPageSize={3}
//                             showPagination={false}
//                             SubComponent={row => {
//                                 return (
//                                     <div style={{ padding: "20px" }}>Sub Component!</div>
//                                 );
//                             }}
//                         />
//                     </div>
//                 );
//             }}
//         />
//     );
// };

// export const createTable = (props) => {
//     return (
//         <Table>

//         </Table>
//     );
// }


























function createData(name, calories, fat, carbs, protein) {
    return { calories, fat, carbs, protein, name };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export function EnhancedTable({ data = [] }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelected(newSelected);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const tableHeadCells = !data.length ? [] : Object.keys(data[0]).map((key) => {
        return {
            id: key,
            numeric: typeof (data[0][key]) === "number",
            disablePadding: false,
            label: key
        };
    });

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={tableHeadCells}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell> */}
                                            {
                                                Object.keys(row).map((key, idx) => {
                                                    let extraProps = {};
                                                    if (idx === Object.keys(row).length - 1) {
                                                        extraProps.component = "th"
                                                        extraProps.align = "right"
                                                    }

                                                    return (
                                                        <TableCell align="left" {...extraProps}>
                                                            {row[key]}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </div>
    );
}

export default EnhancedTable;