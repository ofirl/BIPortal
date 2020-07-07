import fetch from 'cross-fetch';
import { Network } from './consts';

export const exampleData = [
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

export const exampleHier = {
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

const predefinedUrls = {
    reddit: "https://www.reddit.com/",
}

export const fetchFromUrl = (url, options) => {
    return fetch(url, options);
}

export const fetchFromFioriService = ({ serviceName, params = {} }) => {
    // todo test it
    console.log(Network.fioriUrlPrefix + serviceName + "?" + Object.keys(params).map((p) => p + "=" + params[p]).join("&"));
    return fetch();
}

export const getChartData = (url, options) => {
    return fetch(url, options);
}

export const getServiceData = ({ baseUrl, name, params, options }) => {
    let url = (predefinedUrls[baseUrl] || "") + name + "?" + Object.keys(params).map((p) => p + "=" + params[p]).join("&");
    return fetchFromUrl(url, options);
}