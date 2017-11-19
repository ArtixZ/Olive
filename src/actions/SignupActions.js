import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER
} from './types';

import {
    CREATE_A_USER
} from './urls';

import { callAPI } from './utils';


export const signupUser = ({ email, password }) => {
    return (dispatch) => {
      dispatch({ type: SIGNUP_USER });
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user);
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                    callAPI('POST', CREATE_A_USER, {idToken})
                    .then(res => {
                        console.log(res)
                        dispatch({
                            type: SIGNUP_USER_SUCCESS
                        });
                    })
                    
                }).catch(function(error) {
                // Handle error
                });
            
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: SIGNUP_USER_FAIL,
                payload: error
            });
        });
    };
  };