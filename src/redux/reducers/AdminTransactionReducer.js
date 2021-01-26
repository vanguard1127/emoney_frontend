import * as actionTypes from 'redux/actionTypes';
import { SUCCESS_SUFFIX, ERROR_SUFFIX } from 'constant';
import _ from 'lodash';

const initialState = {
  list: [],
  selected: {}
};

const AdminTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_GET_TRANSACTION_LIST + SUCCESS_SUFFIX:      
      return _.extend({}, state, {
        list: action.payload.data.list
      });
    case actionTypes.ADMIN_GET_TRANSACTION + SUCCESS_SUFFIX:
      return _.extend({}, state, {
        selected: action.payload.data.selected
      });
    case actionTypes.ADMIN_GET_TRANSACTION_LIST + ERROR_SUFFIX:
      return _.extend({}, state, {
        list: []
      });
    case actionTypes.ADMIN_GET_TRANSACTION + ERROR_SUFFIX:
      return _.extend({}, state, {
        selected: {}
      });
    default: {
      return { ...state };
    }
  }
}

export default AdminTransactionReducer;