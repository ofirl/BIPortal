import fetch from 'cross-fetch';
import { Network } from './consts';

export const fetchFromUrl = (url, options) => {
    return fetch(url, options);
}

export const fetchFromFioriService = (serviceName, params) => {
    console.log(Network.fioriUrlPrefix + serviceName);
    return fetch();
}