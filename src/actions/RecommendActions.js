import {
    GET_FOOD_DETAILS
} from './types';
import { callAPI } from './utils';
import {
    FOOD_DETAILS_FROM_KEYWORDS
} from './urls';

export const getRecommendation = () => {
    return (dispatch, getState) => {
        const data = {"keyword": "Asian Seafood"};

        callAPI( 'POST', FOOD_DETAILS_FROM_KEYWORDS, data)
        .then( res => {
            dispatch(foodDetails(res[FOOD_DETAILS_FROM_KEYWORDS.requestedType[0]]))
        })
    }
}

const foodDetails = (details) => {
    return {
        type: GET_FOOD_DETAILS,
        payload: details
    }
}
