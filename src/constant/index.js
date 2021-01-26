import * as urls from './urls'; 

export const TEST = process.env.NODE_ENV === 'development' ? true : false;
// Redux
export const SUCCESS_SUFFIX = '_SUCCESS'; 
export const ERROR_SUFFIX = '_FAIL'; 

// API URLS
export const API_URLS = urls; 