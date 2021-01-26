import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
// storages
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import axios from 'axios';
import qs from 'qs';
import settings from 'config/settings';
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import * as reducers from 'redux/reducers';

import { UserActions } from 'redux/actions/UserActions';


// middlewares
const client = axios.create({
  baseURL: settings.url,
  responseType: 'json',
  paramsSerializer: params => qs.stringify(params, { indicies: false })
});

// storage middleware
const userEngine = createEngine('user');
// persist only these state keys to localStorage
const engine = filter(userEngine, ['user', 'similarzipcode']);
export const loadStateFromStorage = storage.createLoader(engine);
const storageMiddleware = storage.createMiddleware(
  engine,
  [],
  [...UserActions]
);

// reducers
const rootReducer = storage.reducer(
  combineReducers({
    ...reducers
  })
);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(axiosMiddleware(client), thunkMiddleware, storageMiddleware)
  )
);
