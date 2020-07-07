import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import DataContext from '../../../../../context/dataContext';

/**
 * This function will infer the filter value from the data
 * @memberof FilterDrawer
 * 
 * @param {Array.<*>} data The data to infer from
 */
function inferOptions(data, key) {
    if (!data || data.length === 0)
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
 * @memberof FilterDrawer
 * 
 * @param {object} props props object
 */
const FilterListField = (props) => {
    const reportData = useContext(DataContext);

    const { classes, filterKey, filter, value, theme, handleChange, MenuProps } = props;
    const { listType, addBlank, dataSource } = filter;

    let data;
    if (dataSource)
        data = dataSource.map((dataSourceId) => reportData[dataSourceId] || []).flat();

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
                multiple={listType === "multi" ? true : false}
                // autoWidth
                value={value ? value : []}
                onChange={(e) => { handleChange((listType === "multi" ? e.target.value : [e.target.value]).map((v) => { return { operator: '=', value: v } })) }}
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
                {
                    (filter.options ? filter.options : (
                        data.length ? inferOptions(data, filterKey)[filterKey] : []
                    )
                    ).map(option => (
                        <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                            {option}
                        </MenuItem>
                    ))
                }
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

export default FilterListField;