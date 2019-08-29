import fetch from 'cross-fetch';
import { Network } from './consts';

export const fetchFromUrl = (url, options) => {
    return fetch(url, options);
}

export const fetchFromFioriService = ({serviceName, params = {}}) => {
    // todo test it
    console.log(Network.fioriUrlPrefix + serviceName + "?" + Object.keys(params).map( (p) => p + "=" + params[p]).join("&"));
    return fetch();
}