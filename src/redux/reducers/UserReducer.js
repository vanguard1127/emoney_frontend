import * as actionTypes from 'redux/actionTypes';
import { SUCCESS_SUFFIX, ERROR_SUFFIX } from 'constant';

const initialState = {
  isAuthorized: false,
  subscription: {},
  loading: false
};

const UserReducer = (state = initialState, action) => {  
  switch (action.type) {
    case actionTypes.USER_LOGIN + SUCCESS_SUFFIX:
    case actionTypes.USER_CREATE + SUCCESS_SUFFIX: {
      return { ...state, isAuthorized: false };
    }
    case actionTypes.USER_LOGIN + ERROR_SUFFIX:
    case actionTypes.USER_CREATE + ERROR_SUFFIX: {
      return { ...state, isAuthorized: false };
    }
    case actionTypes.USER_SUBSCRIBE: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.USER_SUBSCRIBE + SUCCESS_SUFFIX: {
      const subscription = action.payload.data;
      return {
        ...state,
        subscription: subscription,
        plan_code: subscription?.plan?.plan_code,
        loading: false
      };
    }
    case actionTypes.USER_SUBSCRIBE + ERROR_SUFFIX: {
      return {
        ...state,
        loading: false
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default UserReducer;
