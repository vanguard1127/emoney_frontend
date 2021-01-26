import { API_URLS, SUCCESS_SUFFIX, ERROR_SUFFIX } from 'constant';
import * as actionTypes from 'redux/actionTypes';
import { UserSelector } from 'redux/selectors/UserSelector';
import buildAuthorization from 'utils/buildAuthorization';

import { Auth} from 'aws-amplify';

export const checkEmailExists = (email) => (dispatch) => {
    const url = API_URLS.USER_EMAIL_EXISTS_API_URL;

    return dispatch({
        type: actionTypes.CHECK_EMAIL_EXISTS,
        payload: {
            request: {
                url: url,
                method: 'POST',
                data: {
                    email: email
                }
            }
        }
    });
};

export const create = (data) => async (dispatch) => {
    const url = API_URLS.USER_CREATE_API_URL;
    return dispatch({
        type: actionTypes.USER_CREATE,
        payload: {
            request: {
                url: url,
                method: 'POST',
                data: data
            }
        }
    });
};

export const login = (data) => (dispatch) => {
    return Auth.signIn(data.username, data.password).then(
        (response) => {
            dispatch({
                type: actionTypes.USER_LOGIN + SUCCESS_SUFFIX,
                payload: {
                    data: response
                }
            });

            return response;
        },
        (error) => {
            dispatch({
                type: actionTypes.USER_LOGIN + ERROR_SUFFIX,
                payload: {
                    data: error
                }
            });

            throw error;
        }
    );
};

export const subscribe = (data) => (dispatch, getState) => {
    const url = API_URLS.USER_SUBSCRIBE_API_URL;
    const user = UserSelector(getState());
    const auth = buildAuthorization(user);

    return dispatch({
        type: actionTypes.USER_SUBSCRIBE,
        payload: {
            request: {
                url: url,
                method: 'POST',
                data: data,
                headers: {
                    Authorization: auth
                }
            }
        }
    });
};

export const UserActions = [];
