/**
 * @namespace ReportDefinition
*/

/**
 * @typedef DataServiceParameter
 * 
 * @property {string} * parameter to send
 */

/**
 * @typedef DataService
 * @type {object}
 * @memberof ReportDefinition
 * 
 * @property {string} baseUrl baseUrl to use (a predefined name)
 * @property {string} name name of the service
 * @property {DataServiceParameter[]} params parameters for the service
 */

/**
 * Entry in a FilterDef object
* @typedef FilterDefEntry
* @type {object}
* @memberof ReportDefinition
*
* @property {string} label label for the filter field
* @property {"list"|"date"|"tree"} type the type of the filter
* @property {DataService} [service] service for the hierarchy filter
* @property {string} [listType] the type of the list, suported values are: 'single', 'multi', default is 'single'
* @property {Array.<*>} [options] the options of the list
* @property {string[]} dataSource ids of content to get the data from in order to infer options for list
* @property {bool} [addBlank] add a blank option, default is false
* @property {string} dateType the type of the date, supported values are: 'single', 'range' (default is range)
* @property {string | Array.<string>} dateSelection the type of the selection, supported values are: 'year', 'month', 'day', 'time'
*
*/

/**
 * Filter definition
 * @typedef FilterDef
 * @type {Object}
 * @memberof ReportDefinition
 *
 * @property {FilterDefEntry} * The filter definition.
 *
*/

/**
 * Grid layout of the report
 * @typedef ReportLayout
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string} columns="auto" columns in the report (in CSS Grid format)
 * @property {string} rows="auto" rows in the report (in CSS Grid format)
*/

/**
 * Label list
 * @typedef ChartLabelList
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string} suffix label suffix
 * @property {string} prefix label prefix
 * @property {bool} showZeroes=false show label of zero values
 * @property {bool} showNulls=false show label of null values
 * @property {string} dataKey data key for label value
 * @property {string} position="inside" label position
 * @property {object} props will be injected to the LabelList component directly
 */

/**
 * Chart background
 * @typedef ChartBackground
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string} fill background fill color
 */

/**
 * Chart type definition
 * @typedef ChartType
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string} type chart type
 * @property {ChartLabelList|bool} labelList label definition
 * @property {ChartBackground|bool} background boolean for no\default background,
 * @property {string} dataKey data key for the chart values
 * @property {object} props will be injected to the chart component directly
 */

/**
 * @typedef ChartAxis
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {object|bool} x x axis definition, will be passed directly to the axis component
 * @property {object|bool} y y axis definition, will be passed directly to the axis component
 */

/**
 * Chart tooltip definition
 * @typedef ChartTooltip
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string[]} hideKeys data keys to remove
 * @property {string[]} showKeys data keys to add
 * @property {object} props will be injected directly to the tooltip component

/**
 * Chart legend definitoin
 * @typedef ChartLegend
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {string} height="1.5em" legend height
 * @property {string[]} hideKeys keys to hide from legend
 * @property {object} props will be injected directly to the legend component
 */

/**
 * Chart definition
 * @typedef ChartDefinition
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {"composed"|"table"|"pie"} mainType="composed" main type for the chart
 * @property {DataService} service service for the data
 * @property {ChartType[]} type chart type definitions
 * @property {string} title chart title
 * @property {ChartAxis} axis axis definitions
 * @property {ChartTooltip} tooltip tooltip definition
 * @property {ChartLegend|bool} legend legend definition
 * @property {object} props will be injected directly to the composed chart component
 */

/**
 * Redirects the page
 * @memberof ReportDefinition
 * 
 * @param {string} target target url
 * @param {object} params parameters object ( {key: value} will be injected as ?key=value )
 */
function setRedirect(target, params) { }

/**
 * Render function, will override ALL template rendering
 * @memberof ReportDefinition
 *
 * @param {object[]} data the data to show
 * @param {setRedirect} setRedirect helper method to redirect the page (like on a drilldown) (see methods)
 *
 * @returns {Component}
 */
function render(data, setRedirect) { }

/**
 * Report content definition
 * @typedef ReportContent
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {number} left grid cell starting column (starting from 1)
 * @property {number} top grid cell starting row (starting from 1)
 * @property {number} height grid cell height
 * @property {number} width grid cell width
 * @property {ChartDefinition} chart chart definition
*  @property {render} render render function (see methods)
 */

/**
 * Report definion
 * @typedef ReportDefinition
 * @type {object}
 * @memberof ReportDefinition
 *
 * @property {ReportLayout} layout grid layout
 * @property {FilterDef} filterDef filter definition
 * @property {ReportContent[]} content content definitions
 */