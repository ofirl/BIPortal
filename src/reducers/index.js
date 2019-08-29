import { createActions, handleActions } from 'redux-actions'
import fetch from 'cross-fetch';
import { fetchFromUrl, fetchFromFioriService } from '../Utils/network';

const exampleData = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400,
    "date": '01/05/2019'
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210,
    "date": '01/06/2019'
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290,
    "date": '01/06/2019'
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000,
    "date": '01/06/2019'
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181,
    "date": '01/06/2019'
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500,
    "date": '01/06/2019'
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100,
    "date": '01/06/2019'
  }
];

const exampleHier = {
  id: 'Chapter 1',
  name: 'Chapter 1',
  toggled: true,
  active: true,
  children: [
    {
      id: 'Chapter 1.1',
      name: 'Chapter 1.1',
      children: [
        { id: 'Page A', name: 'Page A' },
        { id: 'Page B', name: 'Page B' }
      ]
    },
    {
      id: 'loading',
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      id: 'Chapter 1.2',
      name: 'Chapter 1.2',
      children: [
        {
          id: 'Chapter 2.1',
          name: 'Chapter 2.1',
          children: [
            { id: 'Page C', name: 'Page C' },
            { id: 'Page D', name: 'Page D' },
            { id: 'Page E', name: 'Page E' },
            { id: 'Page F', name: 'Page F' },
            { id: 'Page G', name: 'Page G' }
          ]
        }
      ]
    },
    {
      id: 'Chapter 1.3',
      name: 'Chapter 1.3',
      children: [
        {
          id: 'Chapter 3.1',
          name: 'Chapter 3.1',
          children: [
            { id: 'אח"י חנית', name: 'אח"י חנית' },
            { id: 'אח"י סופה', name: 'אח"י סופה' }
          ]
        }
      ]
    }
  ]
};

function getPercentMockData(executedPercent) {
  return {
    executedPercent: executedPercent,
    unexecutedPercent: 100 - executedPercent,
  };
}

let lockshData = [
  {
    id: 'אח"י חנית',
    name: 'אח"י חנית',
    ...getPercentMockData(30)
  },
  {
    id: 'אח"י סופה',
    name: 'אח"י סופה',
    ...getPercentMockData(0)
  }
];

// sync function
export const { /* sync */ setData, setDataUrl, setActiveFilter, setHierarchy, setFetchFlag, toggleFetchFlag, /* async *//* fetchData*/ } = createActions({
  SET_DATA: (data = [], isFetching = false) => ({ data: { fetched: data, isFetching } }),
  SET_DATA_URL: (dataUrl = {}) => ({ dataUrl }),
  SET_ACTIVE_FILTER: (activeFilter = {}) => ({ activeFilter }),
  SET_HIERARCHY: (hierarchy = {}, isFetching = false) => ({ hierarchy: { fetched: hierarchy, isFetching } }),
  SET_FETCH_FLAG: (type, isFetching = true) => ({ type, isFetching }),
  TOGGLE_FETCH_FLAG: (type) => ({ type }),
});

// async functions
export const fetchData = (url) => {
  return (dispatch, getState) => {
    if (getState().dataUrl === url)
      return Promise.resolve();

    dispatch(setDataUrl(url));
    dispatch(setFetchFlag('data', true));

    // return fetchFromFioriService('https://www.reddit.com/r/reactjs.json')
    return fetchFromUrl('https://www.reddit.com/r/reactjs.json')
      .then(
        response => response.json(),
        error => console.log(error)
      )
      .then(jsonData => dispatch(setData(lockshData))) // set data and reset flag here
    // .then(() => dispatch(setFetchFlag('data', false))); // reset flag (merged with the set data)
  }
};

export default handleActions(
  {
    //sync
    [setData]: (state, { payload: { data } }) => {
      return { ...state, data };
    },
    [setDataUrl]: (state, { payload: { dataUrl } }) => {
      return { ...state, dataUrl };
    },
    [setActiveFilter]: (state, { payload: { activeFilter } }) => {
      return { ...state, activeFilter };
    },
    [setHierarchy]: (state, { payload: { hierarchy } }) => {
      return { ...state, hierarchy };
    },
    [setFetchFlag]: (state, { payload: { type, isFetching } }) => {
      return { ...state, [type]: { fetched: state[type].fetched ? state[type].fetched : [], isFetching } };
    },
    [toggleFetchFlag]: (state, { payload: { type } }) => {
      return { ...state, [type]: { fetched: state[type].fetched ? state[type].fetched : [], isFetching: !state[type].isFetching } };
    },

    // async
    [fetchData]: (state, { payload: { dataUrl, status, error } }) => {
      return { ...state };
    },
  },
  {
    dataUrl: {},
    data: {
      fetched: lockshData,
      isFetching: false
    },
    activeFilter: {},
    hierarchy: {
      fetched: exampleHier,
      isFetching: false
    }
  }
);