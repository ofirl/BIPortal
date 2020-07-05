/**
 * @typedef filterDefEntry
 * @type {object} 
 * @property {string} label label for the filter field
 * @property {string} type the type of the filter, supported values are: 'list', 'date'
 * @property {string} [listType] the type of the list, suported values are: 'single', 'multi', default is 'single'
 * @property {Array.<*>} [options] the options of the list
 * @property {bool} [addBlank] add a blank option, default is false
 * @property {string} dateType the type of the date, supported values are: 'single', 'range' (default is range)
 * @property {string | Array.<string>} dateSelection the type of the selection, supported values are: 'year', 'month', 'day', 'time'
 */
/**
 * @typedef filterDef
 * @type {Object}
 * @property {filterDefEntry} * The filter definition.
 */