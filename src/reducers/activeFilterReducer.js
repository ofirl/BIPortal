/**
 * @typedef activeFilter
 * @type {Object}
 * @property {Array.<{operator: '='|'!='|'<'|'>'|'<='|'>='|'date-between'|'date-single', value}>} * Array of active filters.
 */
const exampleActiveFilter = {
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
};

const activeFilter = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_FILTER':
      return action.activeFilter;
    default:
      return {};
  }
}

export default activeFilter;